import os

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")

# Chroma settings
CHROMA_PATH = "./chroma_data"

# Embedding settings
EMBEDDING_MODEL = "models/embedding-001"
EMBEDDING_DIMENSIONS = 768

# Chunk settings
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50

# Retrieval settings
TOP_K = 5
