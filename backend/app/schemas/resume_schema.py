from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class ResumeUploadResponse(BaseModel):
    resume_id: int
    original_filename: str
    saved_as: str
    upload_time: datetime
    parsed_data: Optional[Dict[str, Any]] = None

class ResumeUploadResult(BaseModel):
    message: str
    files: List[ResumeUploadResponse]
