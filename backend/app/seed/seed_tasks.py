import uuid
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.recommended_task import RecommendedTask
from datetime import datetime

FIREBASE_USER_ID = "mUzFgYG358f3o2FQ9jzEsfrLCrV2"
mock_tasks = [
    {
        "title": "Explore the HireYesh dashboard UI",
        "description": "Click around the dashboard, sidebar, and daily planner to get familiar with the layout.",
        "tags": ["UI", "Tour", "Getting Started"],
        "priority": "high",
        "type": "research",
        "estimated_time": "3 min",
        "reason": "Know where everything is to use the platform effectively"
    },
    {
        "title": "Complete your profile",
        "description": "Fill out your experience, skills, and preferences to get better recommendations.",
        "tags": ["Profile", "Setup", "Recommended"],
        "priority": "high",
        "type": "application",
        "estimated_time": "5 min",
        "reason": "First-time users get personalized tasks after completing profile"
    },
    {
        "title": "Upload your resume",
        "description": "Let the AI analyze your resume and find matching job opportunities.",
        "tags": ["Resume", "AI Analysis"],
        "priority": "high",
        "type": "application",
        "estimated_time": "3 min",
        "reason": "Resume powers your AI recommendations"
    },
    {
        "title": "Try a mock interview",
        "description": "Record a short mock interview to test the AI feedback engine.",
        "tags": ["Practice", "Interview", "AI Feedback"],
        "priority": "medium",
        "type": "interview",
        "estimated_time": "10 min",
        "reason": "See how our AI analyzes your tone, posture, and confidence"

    },
    {
        "title": "Connect LinkedIn for networking insights",
        "description": "Get warm intros to recruiters and hiring managers in your network.",
        "tags": ["Networking", "LinkedIn", "Recruiters"],
        "priority": "medium",
        "type": "networking",
        "estimated_time": "5 min",
        "reason": "Increase interview chances by 3x via warm intros"
    },
]

def seed_tasks():
    
    """Seed the database with mock recommended tasks."""
    db: Session = SessionLocal()
    for task in mock_tasks:
        db_task =RecommendedTask(
            id = str(uuid.uuid4()),
            user_id = FIREBASE_USER_ID,
            title = task["title"],
            description = task["description"],
            tags = task["tags"],
            priority = task["priority"],
            type = task["type"],
            estimated_time = task["estimated_time"],
            reason = task["reason"],
            created_at = datetime.utcnow()
        )
        db.add(db_task)
    db.commit()
    db.close()
    print("Seeded recommended tasks successfully.")

if __name__ == "__main__":
    seed_tasks()
    print("Seeding completed.")
