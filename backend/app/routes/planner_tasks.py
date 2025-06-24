from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.auth import verify_firebase_token
from app.models.recommended_task import RecommendedTask
from app.schemas.task_schema import TaskOut

router = APIRouter()
@router.get("/planner-tasks", response_model=list[TaskOut])
def get_planner_tasks(
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token)
):
    tasks = db.query(RecommendedTask).filter_by(user_id=user_id, status="accepted").all()
    return tasks