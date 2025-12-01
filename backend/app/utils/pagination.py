"""Pagination utilities."""
from typing import Generic, TypeVar, List
from pydantic import BaseModel
from fastapi import Query

T = TypeVar('T')


class PaginationParams(BaseModel):
    """Pagination parameters."""
    page: int = Query(1, ge=1, description="Page number")
    page_size: int = Query(20, ge=1, le=100, description="Items per page")
    
    @property
    def skip(self) -> int:
        """Calculate skip offset."""
        return (self.page - 1) * self.page_size
    
    @property
    def limit(self) -> int:
        """Get limit."""
        return self.page_size


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated response wrapper."""
    items: List[T]
    total: int
    page: int
    page_size: int
    has_more: bool = False
    
    @classmethod
    def create(
        cls,
        items: List[T],
        total: int,
        page: int,
        page_size: int
    ) -> "PaginatedResponse[T]":
        """Create paginated response."""
        return cls(
            items=items,
            total=total,
            page=page,
            page_size=page_size,
            has_more=(page * page_size) < total
        )


def paginate(query, page: int = 1, page_size: int = 10):
    """Paginate a SQLAlchemy query."""
    from sqlalchemy import func
    
    total = query.count()
    items = query.offset((page - 1) * page_size).limit(page_size).all()
    
    return items, total

