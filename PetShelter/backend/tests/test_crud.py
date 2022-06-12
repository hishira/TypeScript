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

def test_get_pet_types():
    response = client.get("pettypes");
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 5

def test_get_cat_breed():
    response = client.get("/breed/dog")
    assert response.status_code == 200
    data = response.json()
    # Before database update
    #assert len(data) == 0
    assert len(data) == 1

def test_get_dog_breed():
    response = client.get("/breed/cat")
    assert response.status_code == 200
    data = response.json()
    #Before database update
    #assert len(data) == 0
    assert len(data) == 1

def test_cat_breed_data_values():
    response = client.get("/breed/cat")
    data = response.json()
    data_value = data[0]
    assert 'value' in data_value
    assert 'pettype_id' in data_value

def test_dog_breed_data_values():
    response = client.get("/breed/dog")
    data = response.json()
    data_value = data[0]
    assert 'value' in data_value
    assert 'pettype_id' in data_value

def test_pet_size_test():
    response = client.get('/petsize')
    data = response.json()
    assert len(data) == 4

def test_pet_size_values():
    response = client.get('/petsize')
    data = response.json()
    data_value = data[0]
    assert 'id' in data_value
    assert 'value' in data_value

def test_get_centers_status():
    response = client.get('/centers')
    response_status = response.status_code;
    assert response_status == 200

def test_get_centers():
    response = client.get('/centers')
    data = response.json()
    assert len(data) == 3

def test_centers_values():
    response = client.get('/centers')
    data = response.json()
    data_values = data[0]
    assert 'id' in data_values
    assert 'name' in data_values
    assert 'city' in data_values
    assert 'address' in data_values
    assert 'phone' in data_values
    assert 'description' in data_values