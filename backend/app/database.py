import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Default to SQLite for seamless local development if PostgreSQL is not active yet,
# or seamlessly connect to PostgreSQL via DATABASE_URL environment variable.
DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "sqlite:///./taskflow.db"
)

# SQLite requires connect_args check_same_thread=False
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """Dependency helper to yield database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
