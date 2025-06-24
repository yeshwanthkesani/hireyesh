from sqlalchemy import Column, String, DateTime, ARRAY
from datetime import datetime
from app.core.database import Base

class RecommendedTask(Base):
    __tablename__ = "recommended_tasks"
    id = Column(String, primary_key=True)
    user_id = Column(String, index=True)  # Firebase user ID
    title = Column(String, nullable=False)
    description = Column(String)
    tags = Column(ARRAY(String))
    priority = Column(String)
    type = Column(String)
    estimated_time = Column(String)
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="pending")

    