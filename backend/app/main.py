from fastapi import FastAPI
from app.routes import recommended_tasks
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.routes import task_actions
from app.routes import planner_tasks
from app.routes import resume_upload
import logging
logging.basicConfig(level=logging.INFO)
logging.info("Database tables created successfully.")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(recommended_tasks.router, tags=["Recommended Tasks"])
app.include_router(task_actions.router, tags=["Tasks Actions"])
app.include_router(planner_tasks.router, tags=["Planner"])
app.include_router(resume_upload.router, tags = ["Resume Upload"]) 
print("Database tables created successfully.")