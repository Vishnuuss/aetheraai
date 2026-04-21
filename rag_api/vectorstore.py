from typing import List

import chromadb
from chromadb.config import Settings

from config import CHROMA_PATH
import embedder


class VectorStore:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=CHROMA_PATH)
        self.collection = self.client.get_or_create_collection(
            name="documents",
            metadata={"hns:space": "cosine"}
        )

    def add_documents(self, chunks: List[dict]):
        """Add document chunks to the vector store."""
        texts = [c["text"] for c in chunks]
        embeddings = embedder.embed_texts(texts)
        metadatas = [c["metadata"] for c in chunks]
        ids = [f"chunk_{i}" for i in range(len(chunks))]

        self.collection.add(
            embeddings=embeddings,
            documents=texts,
            metadatas=metadatas,
            ids=ids
        )

    def search(self, query: str, top_k: int = 5) -> List[dict]:
        """Search for most relevant chunks for a query."""
        query_embedding = embedder.embed_query(query)
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=top_k
        )

        docs = []
        for i in range(len(results["documents"][0])):
            docs.append({
                "text": results["documents"][0][i],
                "metadata": results["metadatas"][0][i],
                "distance": results["distances"][0][i]
            })
        return docs

    def reset(self):
        """Clear all documents from the store."""
        self.client.delete_collection("documents")
        self.collection = self.client.get_or_create_collection(
            name="documents",
            metadata={"hns:space": "cosine"}
        )
