from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.recommended_task import RecommendedTask
from app.schemas.task_schema import TaskOut
from app.core.auth import verify_firebase_token
from pydantic import BaseModel
from fastapi import HTTPException

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

class TaskCompletionRequest(BaseModel):
    task_id: str
    completed: bool
@router.post("/task/complete")
def update_task_completion(
    payload: TaskCompletionRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token),
):
    task = db.query(RecommendedTask).filter_by(id=payload.task_id, user_id=user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or does not belong to the user")
    task.status = "completed" if payload.completed else "accepted"
    db.commit()
    return {"message": f"Task marked as {'completed' if payload.completed else 'incomplete'}."}
