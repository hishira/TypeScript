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


app.dependency_overrides[getdb] = override_get_db

client = TestClient(app)

#def runScriptOnDatabase():
#    rc = call("../../config/test_config/test-config.sh", shell=True)


def test_get_pet_types():
    response = client.get("pettypes")
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
    response_status = response.status_code
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
    assert 'address' in data_values
    assert 'phone' in data_values
    assert 'description' in data_values


def test_centers_address_values():
    response = client.get('/centers')
    data = response.json()
    data_values = data[0]
    data_address = data_values['address']
    print(data_address)
    assert 'address' in data_address
    assert 'city' in data_address
    assert 'country' in data_address
    assert 'id' in data_address
    assert 'lat' in data_address
    assert 'lng' in data_address


def test_get_cat_pets_response_status():
    response = client.get('/pet/getallcat')
    assert response.status_code == 200


def test_get_cat_pets_length():
    response = client.get('/pet/getallcat')
    response_value = response.json()
    assert len(response_value) == 1


def test_get_cat_pets_value():
    response = client.get('/pet/getallcat')
    response_value = response.json()[0]
    assert 'id' in response_value
    assert 'short_description' in response_value
    assert 'description' in response_value
    assert 'weight' in response_value
    assert 'brithdate' in response_value


def test_get_dog_pets_response_status():
    response = client.get('/pet/getalldog')
    assert response.status_code == 200


def test_get_dog_pets_length():
    response = client.get('/pet/getalldog')
    response_value = response.json()
    assert len(response_value) == 1


def test_get_dog_pets_value():
    response = client.get('/pet/getalldog')
    response_value = response.json()[0]
    assert 'id' in response_value
    assert 'short_description' in response_value
    assert 'description' in response_value
    assert 'weight' in response_value
    assert 'brithdate' in response_value


# For that moment


def test_get_photos_pet():
    response = client.get('/pet/getalldog')
    response_value = response.json()[0]

    photo_response = client.get(f'/pet/photos/{response_value["id"]}')
    assert photo_response.status_code == 200


def test_check_photo_values():
    response = client.get('/pet/getalldog')
    response_value = response.json()[0]

    photo_response = client.get(f'/pet/photos/{response_value["id"]}')
    photo_response = photo_response.json()[0]
    assert 'id' in photo_response
    assert 'url' in photo_response
    assert 'pet_id' in photo_response


def test_pet_gende_should_status_200():
    response = client.get('/gender')
    assert response.status_code == 200


def test_pet_gender_should_be_array():
    response = client.get('/gender')
    assert isinstance(response.json(), list) == True


def test_pet_gender_should_be_2_value():
    response = client.get('/gender')
    response_value = response.json()
    assert len(response_value) == 2


def test_pet_gender_value_should_be_dict():
    response = client.get('/gender')
    response_value = response.json()[0]
    assert isinstance(response_value, dict) == True


def test_pet_gender_value():
    response = client.get('/gender')
    response_value = response.json()[0]
    assert 'id' in response_value
    assert 'value' in response_value

def test_pet_get_by_id():
    response = client.get(f"/pet/byid/{1}")
    response_stat = response.status_code;
    assert response_stat == 200

def test_pet_get_by_id_values():
    response = client.get(f"/pet/byid/{1}")
    response_data = response.json()[0]
    assert 'id' in response_data
    assert 'name' in response_data
    assert 'weight' in response_data
    assert 'brithdate' in response_data
    assert 'short_description' in response_data
    assert 'description' in response_data