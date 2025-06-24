from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TaskOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    tags: List[str]
    priority: str
    type: str
    estimated_time: Optional[str]
    reason: str
    created_at: datetime # need to revert back
    status: Optional[str] = "pending"  # Default status is 'pending'

    class Config:
        orm_mode = True