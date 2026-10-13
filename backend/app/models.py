from datetime import datetime, date
from typing import Optional, List
from sqlalchemy import (
    Column,
    BigInteger,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    ForeignKey,
    CheckConstraint,
    Index,
    func
)
from sqlalchemy.orm import relationship
from backend.app.database import Base


class User(Base):
    """
    Mandatory table 1: users
    Stores authenticated user credentials and profile.
    """
    __tablename__ = "users"

    id = Column(BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), nullable=False, unique=True, index=True)
    hashed_password = Column(Text, nullable=False)
    role = Column(String(20), nullable=False, default="user")
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())

    # Relationships
    tasks = relationship("Task", back_populates="owner", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="owner", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<User id={self.id} email='{self.email}' name='{self.name}'>"


class Task(Base):
    """
    Mandatory table 2: tasks
    Stores tasks strictly owned by an authenticated user.
    """
    __tablename__ = "tasks"

    id = Column(BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), nullable=False, default="pending")
    priority = Column(String(10), nullable=False, default="medium")
    due_date = Column(Date, nullable=True)
    user_id = Column(BigInteger().with_variant(Integer, "sqlite"), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    project_id = Column(BigInteger().with_variant(Integer, "sqlite"), ForeignKey("projects.id", ondelete="SET NULL"), nullable=True, index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, default=func.now(), onupdate=func.now())

    # Constraints
    __table_args__ = (
        CheckConstraint("status IN ('pending', 'in_progress', 'completed')", name="task_status_allowed"),
        CheckConstraint("priority IN ('low', 'medium', 'high')", name="task_priority_allowed"),
        CheckConstraint("LENGTH(TRIM(title)) > 0", name="task_title_not_blank"),
        Index("ix_tasks_user_status", "user_id", "status"),
    )

    # Relationships
    owner = relationship("User", back_populates="tasks")
    project = relationship("Project", back_populates="tasks")

    def __repr__(self) -> str:
        return f"<Task id={self.id} title='{self.title}' status='{self.status}' user_id={self.user_id}>"


class Project(Base):
    """
    Extension table 3: projects (TaskFlow phase 2)
    Allows users to group their personal tasks.
    """
    __tablename__ = "projects"

    id = Column(BigInteger().with_variant(Integer, "sqlite"), primary_key=True, autoincrement=True)
    owner_user_id = Column(BigInteger().with_variant(Integer, "sqlite"), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(160), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), nullable=False, default="active")
    start_date = Column(Date, nullable=True)
    due_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, default=func.now(), onupdate=func.now())

    __table_args__ = (
        CheckConstraint("status IN ('active', 'completed', 'archived')", name="project_status_allowed"),
        CheckConstraint("LENGTH(TRIM(name)) > 0", name="project_name_not_blank"),
    )

    # Relationships
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project")

    def __repr__(self) -> str:
        return f"<Project id={self.id} name='{self.name}' owner_user_id={self.owner_user_id}>"
