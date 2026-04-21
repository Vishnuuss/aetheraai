import os
import uuid
from pathlib import Path
from typing import List, Optional

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

import parser
import vectorstore
import llm
from config import TOP_K

app = FastAPI(title="NexaFlow RAG Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory chat history per session
chat_histories: dict[str, List[dict]] = {}

UPLOAD_DIR = Path("./uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


class ChatRequest(BaseModel):
    question: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    session_id: str


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Parse and index a document file."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    ext = Path(file.filename).suffix.lower()
    if ext not in [".pdf", ".docx", ".txt"]:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload PDF, DOCX, or TXT"
        )

    file_id = str(uuid.uuid4())
    file_path = UPLOAD_DIR / f"{file_id}{ext}"

    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    try:
        chunks = parser.parse_document(str(file_path), file.filename)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse document: {str(e)}")

    try:
        vs = vectorstore.VectorStore()
        vs.add_documents(chunks)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to index document: {str(e)}")

    return {
        "chunks": len(chunks),
        "filename": file.filename,
        "message": f"Indexed {file.filename} successfully with {len(chunks)} chunks"
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Answer a question using the indexed documents."""
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    session_id = request.session_id or str(uuid.uuid4())
    if session_id not in chat_histories:
        chat_histories[session_id] = []

    try:
        vs = vectorstore.VectorStore()
        results = vs.search(request.question, top_k=TOP_K)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

    if not results:
        return ChatResponse(
            answer="No documents have been indexed yet. Please upload a document first.",
            sources=[],
            session_id=session_id
        )

    context = "\n\n---\n\n".join([r["text"] for r in results])
    sources = list(set([r["metadata"]["source"] for r in results]))

    try:
        answer = llm.chat(request.question, context)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM failed: {str(e)}")

    chat_histories[session_id].append({
        "question": request.question,
        "answer": answer,
        "sources": sources
    })

    return ChatResponse(answer=answer, sources=sources, session_id=session_id)


@app.get("/history/{session_id}")
async def get_history(session_id: str):
    """Get chat history for a session."""
    return chat_histories.get(session_id, [])


@app.post("/reset")
async def reset_index():
    """Clear all indexed documents and chat history."""
    vs = vectorstore.VectorStore()
    vs.reset()
    chat_histories.clear()
    return {"message": "Index and chat history cleared"}


@app.get("/")
async def root():
    return FileResponse("public/index.html")


app.mount("/public", StaticFiles(directory="public"), name="public")
