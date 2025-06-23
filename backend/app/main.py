from fastapi import FastAPI
from app.routes import recommended_tasks
from app.core.database import Base, engine
from app.models.recommended_task import RecommendedTask
from fastapi.middleware.cors import CORSMiddleware

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
print("Database tables created successfully.")