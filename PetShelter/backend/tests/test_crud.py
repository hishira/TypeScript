from http.client import responses
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from ..utils.database_connection import Base
from ..utils.database import getdb
from ..main import app
from subprocess import call

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL,
                       connect_args={"check_same_thread": False})

TestingSessionLocal = sessionmaker(autocommit=False,
                                   autoflush=False,
                                   bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[getdb]=override_get_db

client = TestClient(app)

#def runScriptOnDatabase():
#    rc = call("../../config/test_config/test-config.sh", shell=True)

def test_get_cat_breed():
    response = client.get("/breed/dog")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0

def test_get_dog_breed():
    response = client.get("/breed/cat")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 0