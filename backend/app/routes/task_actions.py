from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import verify_firebase_token
from app.models.recommended_task import RecommendedTask
from pydantic import BaseModel

router = APIRouter()

class TaskUpdateRequest(BaseModel):
    task_id: str

@router.post("/tasks/accept")
def accept_task(
    payload: TaskUpdateRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token),
):
    task = db.query(RecommendedTask).filter_by(id=payload.task_id, user_id=user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or does not belong to the user")
    task.status = "accepted"
    db.commit()
    return {"message": "Task accepted successfully."}


@router.post("/tasks/snooze")
def snooze_task(
    payload: TaskUpdateRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token),
):
    task = db.query(RecommendedTask).filter_by(id=payload.task_id, user_id=user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or does not belong to the user")
    task.status = "snoozed"
    db.commit()
    return {"message": "Task snoozed successfully."}


@router.post("/tasks/dismiss")
def dismiss_task(
    payload: TaskUpdateRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token),
):
    task = db.query(RecommendedTask).filter_by(id=payload.task_id, user_id=user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or does not belong to the user")
    task.status = "dismissed"
    db.commit()
    return {"message": "Task dismissed successfully."}
class TaskStatusUpdateRequest(BaseModel):
    task_id: str
    completed: bool

@router.post("/tasks/complete")
def update_task_status(
    payload: TaskStatusUpdateRequest,
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token),
    ):
    print("✅ /tasks/complete hit")
    task = db.query(RecommendedTask).filter_by(id=payload.task_id, user_id=user_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or does not belong to the user")
    
    task.status = "completed" if payload.completed else "accepted"
    db.commit()
    
    return {"message": f"Task marked as {'completed' if payload.completed else 'accepted'}."}
