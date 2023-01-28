from .database_connection import SessionLocal;
def getdb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()