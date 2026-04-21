from typing import List

import google.generativeai as genai

from config import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)


def generate_answer(context: str, question: str, history: List[dict] = None) -> str:
    """Generate an answer using Gemini, given context and question."""
    prompt = f"""You are a helpful AI assistant. Use the provided context to answer the user's question.

Context:
{context}

Question: {question}

Answer based only on the context above. If the answer is not in the context, say "I don't have enough information to answer that question based on the provided documents."
"""

    model = genai.GenerativeModel("gemini-2.0-flash")

    generation_config = {
        "temperature": 0.3,
        "top_p": 0.8,
        "top_k": 40,
        "max_output_tokens": 2048,
    }

    response = model.generate_content(
        prompt,
        generation_config=generation_config
    )

    return response.text


def chat(question: str, context: str) -> str:
    """Simple chat wrapper with context injected."""
    return generate_answer(context, question)
