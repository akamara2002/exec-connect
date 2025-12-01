"""
Unified configuration settings for Exec-Connect backend application.
"""
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Database
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/exec_connect"
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    LLM_MODEL: str = "gpt-5.1"  # Default model
    
    # RAG Configuration
    RAG_ENABLED: bool = True
    RAG_TOP_K: int = 4
    
    # Application
    API_V1_PREFIX: str = "/api"
    APP_NAME: str = "Exec-Connect Unified AI Agents System"
    DEBUG: bool = False
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    
    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()

