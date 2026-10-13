"""
Database verification and initialization script.
Verifies table creation and model integrity.
"""
import sys
import os

# Set current path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.app.database import engine, Base, SessionLocal
from backend.app.models import User, Task, Project

def init_and_test_database():
    print("[*] Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    print("[+] Tables created successfully:", list(Base.metadata.tables.keys()))

    db = SessionLocal()
    try:
        # Check if dummy user exists or create one for sanity check
        test_email = "intern.demo@taskflow.dev"
        user = db.query(User).filter(User.email == test_email).first()
        if not user:
            print("[*] Creating verification user...")
            user = User(
                name="Internship Demo",
                email=test_email,
                hashed_password="mock_hashed_password_for_verification",
                role="user"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print(f"[+] User created with ID: {user.id}")

            # Create verification task
            print("[*] Creating verification task for user...")
            task = Task(
                title="Complete Database Setup Milestone",
                description="Initialize schema and ORM models according to tutor guide",
                status="completed",
                priority="high",
                user_id=user.id
            )
            db.add(task)
            db.commit()
            db.refresh(task)
            print(f"[+] Task created with ID: {task.id}, Title: '{task.title}'")

        # Query and display
        tasks = db.query(Task).filter(Task.user_id == user.id).all()
        print(f"[+] Verified {len(tasks)} task(s) owned by user {user.email}:")
        for t in tasks:
            print(f"   - [ID: {t.id}] [{t.status}] {t.title} (Priority: {t.priority})")

    finally:
        db.close()
        print("[+] Database verification completed successfully!")

if __name__ == "__main__":
    init_and_test_database()
