"""
Unified RAG vectorstore implementation for all document types.
Supports Finance, Marketing, Operations, and Technology documents.
"""
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import text, select
from openai import OpenAI
import json

from app.config import settings
from app.db.models import (
    FinanceDocument,
    MarketingDocument,
    OpsDocument,
    TechDocument
)

# Initialize OpenAI client
_client: Optional[OpenAI] = None


def get_openai_client() -> OpenAI:
    """Get or create OpenAI client."""
    global _client
    if _client is None:
        _client = OpenAI(api_key=settings.OPENAI_API_KEY)
    return _client


def get_embedding(text: str) -> List[float]:
    """Get embedding vector for text using OpenAI."""
    client = get_openai_client()
    try:
        response = client.embeddings.create(
            model="text-embedding-3-small",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Error getting embedding: {e}")
        return []


# Finance Documents
def upsert_finance_document(db: Session, title: str, content: str) -> FinanceDocument:
    """Create or update a finance document with embedding."""
    try:
        embedding = get_embedding(content)
        
        doc = FinanceDocument(
            title=title,
            content=content,
            embedding=embedding
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc
    except Exception as e:
        db.rollback()
        raise


def search_finance_docs(db: Session, query: str, top_k: int = 4) -> List[FinanceDocument]:
    """Search finance documents using vector similarity."""
    if not settings.RAG_ENABLED:
        return []
    
    try:
        query_embedding = get_embedding(query)
        if not query_embedding:
            return []
        
        # Use pgvector cosine similarity search
        embedding_str = "[" + ",".join(map(str, query_embedding)) + "]"
        conn = db.connection().connection
        
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT id, title, content, created_at
                FROM finance_documents
                WHERE embedding IS NOT NULL
                ORDER BY embedding <=> %s::vector
                LIMIT %s
            """, (embedding_str, top_k))
            results = cursor.fetchall()
        
        docs = []
        for row in results:
            doc = db.query(FinanceDocument).filter(FinanceDocument.id == row[0]).first()
            if doc:
                docs.append(doc)
        
        return docs
    except Exception as e:
        print(f"Error searching finance docs: {e}")
        return []


# Marketing Documents
def upsert_marketing_document(db: Session, title: str, content: str) -> MarketingDocument:
    """Upsert a marketing document with its embedding."""
    embedding = get_embedding(content)
    
    existing = db.query(MarketingDocument).filter(MarketingDocument.title == title).first()
    
    if existing:
        existing.content = content
        existing.embedding = embedding
        db.commit()
        db.refresh(existing)
        return existing
    else:
        doc = MarketingDocument(
            title=title,
            content=content,
            embedding=embedding
        )
        db.add(doc)
        db.commit()
        db.refresh(doc)
        return doc


def search_marketing_docs(db: Session, query: str, top_k: int = 4) -> List[MarketingDocument]:
    """Search marketing documents using vector similarity."""
    if not settings.RAG_ENABLED:
        return []
    
    query_embedding = get_embedding(query)
    if not query_embedding:
        return []
    
    embedding_str = "[" + ",".join(map(str, query_embedding)) + "]"
    conn = db.connection().connection
    
    with conn.cursor() as cursor:
        cursor.execute("""
            SELECT id, title, content, created_at
            FROM marketing_documents
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> %s::vector
            LIMIT %s
        """, (embedding_str, top_k))
        results = cursor.fetchall()
    
    docs = []
    for row in results:
        doc = db.query(MarketingDocument).filter(MarketingDocument.id == row[0]).first()
        if doc:
            docs.append(doc)
    
    return docs


# Operations Documents
def upsert_ops_document(db: Session, title: str, content: str) -> OpsDocument:
    """Upsert an operations document with embedding."""
    embedding = get_embedding(content)
    doc = OpsDocument(title=title, content=content, embedding=embedding)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


def search_ops_docs(db: Session, query: str, top_k: Optional[int] = None) -> List[OpsDocument]:
    """Search operations documents using vector similarity."""
    if top_k is None:
        top_k = settings.RAG_TOP_K
    
    embedding = get_embedding(query)
    if not embedding:
        return []
    
    stmt = (
        select(OpsDocument)
        .order_by(OpsDocument.embedding.cosine_distance(embedding))
        .limit(top_k)
    )
    return list(db.execute(stmt).scalars())


# Technology Documents
def upsert_tech_document(db: Session, title: str, content: str) -> TechDocument:
    """Insert or update a technical document with embedding."""
    embedding = get_embedding(f"{title}\n\n{content}")
    embedding_json = json.dumps(embedding) if embedding else None
    
    existing = db.query(TechDocument).filter(TechDocument.title == title).first()
    
    if existing:
        existing.content = content
        existing.embedding = embedding_json
        db.commit()
        db.refresh(existing)
        return existing
    
    doc = TechDocument(
        title=title,
        content=content,
        embedding=embedding_json
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calculate cosine similarity between two vectors."""
    if not vec1 or not vec2 or len(vec1) != len(vec2):
        return 0.0
    
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude1 = sum(a * a for a in vec1) ** 0.5
    magnitude2 = sum(b * b for b in vec2) ** 0.5
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
    
    return dot_product / (magnitude1 * magnitude2)


def search_tech_docs(db: Session, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
    """Search technical documents using semantic similarity."""
    if not settings.RAG_ENABLED:
        return []
    
    query_embedding = get_embedding(query)
    if not query_embedding:
        return []
    
    docs = db.query(TechDocument).filter(TechDocument.embedding.isnot(None)).all()
    
    scored_docs = []
    for doc in docs:
        if not doc.embedding:
            continue
        
        try:
            doc_embedding = json.loads(doc.embedding)
            similarity = cosine_similarity(query_embedding, doc_embedding)
            
            scored_docs.append({
                "title": doc.title,
                "content": doc.content,
                "similarity": similarity
            })
        except Exception as e:
            print(f"Error processing document {doc.id}: {e}")
            continue
    
    scored_docs.sort(key=lambda x: x["similarity"], reverse=True)
    return scored_docs[:top_k]

