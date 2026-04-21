from typing import List

import google.generativeai as genai

from config import GOOGLE_API_KEY, EMBEDDING_MODEL, EMBEDDING_DIMENSIONS

genai.configure(api_key=GOOGLE_API_KEY)


def embed_texts(texts: List[str]) -> List[List[float]]:
    """Generate embeddings for a list of texts using Gemini."""
    embeddings = []
    for text in texts:
        result = genai.embed_content(
            model=EMBEDDING_MODEL,
            content=text,
            task_type="retrieval_document"
        )
        embeddings.append(result["embedding"])
    return embeddings


def embed_query(text: str) -> List[List[float]]:
    """Generate embedding for a query (used in similarity search)."""
    result = genai.embed_content(
        model=EMBEDDING_MODEL,
        content=text,
        task_type="retrieval_query"
    )
    return [result["embedding"]]
