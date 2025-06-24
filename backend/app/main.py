from fastapi import FastAPI
from app.routes import recommended_tasks
from app.core.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from app.routes import task_actions
from app.routes import planner_tasks

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(recommended_tasks.router)
app.include_router(task_actions.router)
app.include_router(planner_tasks.router)
print("Database tables created successfully.")