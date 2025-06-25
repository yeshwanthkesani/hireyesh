from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.schemas.resume_schema import ResumeUploadResponse, ResumeUploadResult
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.resume_model import Resume
from fastapi.responses import JSONResponse
from app.core.auth import verify_firebase_token
from uuid import uuid4
import subprocess
import shutil
import os, requests
from datetime import datetime
from pathlib import Path
from typing import List
from dotenv import load_dotenv

load_dotenv()
AFFINDA_API_KEY = os.getenv("AFFINDA_API_KEY")
AFFINDA_WORKSPACE_ID = os.getenv("AFFINDA_WORKSPACE_ID")
AFFINDA_URL = "https://api.affinda.com/v2/resumes"

router = APIRouter()
UPLOAD_DIR = Path("./uploads/resumes")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_FILE_SIZE_MB = 5  # Set limit to 5 MB


@router.post("/upload-resumes", response_model= ResumeUploadResult)
async def upload_resumes_files(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_firebase_token)
    ):
    """
    Upload resumes to the server, save it locally, and register metadata in the database.
    - **file**: resume file (PDF/DOCX/etc.) to be uploaded.
    - **user_id**: Firebase token to verify user identity.
    - **Returns**: Resume metadata stored in the database.
    """
    uploaded_entries = []
    for file in files:
        if not file.filename.endswith((".pdf", ".docx")):
            raise HTTPException(status_code=400, detail="Only PDF and DOCX files are allowed.")
        # Generate unique filename and paths
        ext = file.filename.split(".")[-1]
        new_filename = f"{uuid4()}.{ext}"
        user_folder = UPLOAD_DIR/ user_id
        user_folder.mkdir(parents=True, exist_ok=True)
        file_path = user_folder / new_filename
        file_size = 0
        file.file.seek(0,2) #move to end
        file_size = file.file.tell() #get size
        file.file.seek(0) #Reset pointer
        if file_size > MAX_FILE_SIZE_MB * 1024 *1024:
            raise HTTPException(status_code=400, detail=f"{file.filename}  exceeds {MAX_FILE_SIZE_MB}MB limit.")
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
                if not scan_file_with_clamav(file_path):
                    os.remove(file_path)
                    raise HTTPException(status_code=400, detail=f" {file.filename} failed virus scan.")
                # Save metadata to database
            
            # Parse resume via Affinda API
            with open(file_path,"rb") as f:
                headers = {"Authorization": f"Bearer {AFFINDA_API_KEY}"}
                files_payload = {"file":(file.filename, f)}
                params = {"workspace": AFFINDA_WORKSPACE_ID}
                response = requests.post(AFFINDA_URL, headers=headers, files=files_payload, params= params)
                if response.status_code !=201:
                    raise HTTPException(status_code=500, detail=f"Affinda Error: {response.text}")
                parsed_json = response.json()
            resume_entry = Resume(
                user_id=user_id,
                filename=new_filename,
                original_filename = file.filename,
                upload_time = datetime.utcnow(),
                parsed_data = parsed_json
            )

            db.add(resume_entry)
            db.commit()
            db.refresh(resume_entry)

            uploaded_entries.append(
                ResumeUploadResponse(
                    resume_id=resume_entry.id,
                    original_filename=file.filename,
                    saved_as=new_filename,
                    upload_time=resume_entry.upload_time,
                    parsed_data=parsed_json
                )
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to upload {file.filename}:{str(e)}")
    return ResumeUploadResult(
        message=f"{len(uploaded_entries)} resume(s) uploaded sucessfully.",
        files=uploaded_entries
    )



def scan_file_with_clamav(file_path: Path) -> bool:
    try:
        result= subprocess.run(
            ["clamscan.exe", "--infected", "--no-summary", str(file_path)],
            capture_output = True, text= True, check= False
        )
        return "Infected files : 1" not in result.stdout
    except Exception as e:
        raise HTTPException(status_code = 500, detail = f"Failed to scan: {str(e)}")