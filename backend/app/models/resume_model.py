from sqlalchemy import Column, Integer, String, DateTime
from app.core.database import Base
from sqlalchemy.dialects.postgresql import JSONB 

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    filename = Column(String)
    original_filename = Column(String)
    upload_time = Column(DateTime)
    parsed_data = Column(JSONB, nullable=True)