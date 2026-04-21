# NexaFlow RAG Agent

AI-powered document Q&A using RAG (Retrieval-Augmented Generation) with Gemini embeddings.

## Features

- Upload PDF, DOCX, or TXT files
- Chat with your documents using natural language
- Gemini-powered answers with source tracking
- Local vector storage with Chroma

## Setup

1. **Clone and install dependencies:**
```bash
cd rag_api
pip install -r requirements.txt
```

2. **Set your API key:**
```bash
export GOOGLE_API_KEY="your_gemini_api_key"
```

3. **Run the server:**
```bash
uvicorn main:app --reload
```

4. **Open in browser:**
```
http://localhost:8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Frontend UI |
| POST | `/upload` | Upload and index a document |
| POST | `/chat` | Ask a question |
| GET | `/history/{session_id}` | Get chat history |
| POST | `/reset` | Clear index and history |

## Tech Stack

- **FastAPI** — Web framework
- **Chroma** — Vector database
- **Gemini** — LLM + embeddings
- **Python** — Backend

## Project Structure

```
rag_api/
├── main.py          # FastAPI app
├── config.py        # Settings
├── parser.py        # Document parsing (PDF, DOCX, TXT)
├── embedder.py      # Gemini embeddings
├── vectorstore.py   # Chroma vector store
├── llm.py           # Gemini chat
└── requirements.txt
public/
└── index.html       # Chat UI
```
