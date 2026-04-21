from pathlib import Path
from typing import List
from pypdf import PdfReader
from docx import Document


def parse_document(file_path: str, filename: str) -> List[dict]:
    """Parse PDF, DOCX, or TXT file and return text chunks with metadata."""
    ext = Path(filename).suffix.lower()

    if ext == ".pdf":
        text = _parse_pdf(file_path)
    elif ext == ".docx":
        text = _parse_docx(file_path)
    elif ext == ".txt":
        text = _parse_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")

    chunks = _chunk_text(text, filename)
    return chunks


def _parse_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text_parts = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            text_parts.append(text)
    return "\n\n".join(text_parts)


def _parse_docx(file_path: str) -> str:
    doc = Document(file_path)
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
    return "\n\n".join(paragraphs)


def _parse_txt(file_path: str) -> str:
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def _chunk_text(text: str, source: str, chunk_size: int = 500, overlap: int = 50) -> List[dict]:
    """Split text into overlapping chunks."""
    words = text.split()
    chunks = []
    start = 0

    while start < len(words):
        end = start + chunk_size
        chunk_text = " ".join(words[start:end])
        chunks.append({
            "text": chunk_text,
            "metadata": {"source": source, "start_word": start}
        })
        start += chunk_size - overlap

    return chunks
