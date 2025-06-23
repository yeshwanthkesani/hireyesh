from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.recommended_task import RecommendedTask
from app.schemas.task_schema import TaskOut
from app.core.auth import verify_firebase_token

router = APIRouter()

@router.get("/recommended-tasks", response_model=list[TaskOut])
def get_tasks(
    request: Request,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token)
):
    tasks = db.query(RecommendedTask).filter_by(user_id=user_id).all()
    
    return [
        {
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "tags": t.tags,
            "priority": t.priority,
            "type": t.type,
            "estimated_time": t.estimated_time,
            "reason": t.reason,
            "created_at": t.created_at,
        }
        for t in tasks
    ]
