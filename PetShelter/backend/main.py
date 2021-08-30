from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:4200"
]
app.add_middleware( CORSMiddleware,
                    allow_origins=origins)
def getdb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"Hello":"world"}

@app.get("/pets/",
    response_model=List[schemas.Pet])
def getallpets(response: Response,db: Session=Depends(getdb)):
    response.status_code = status.HTTP_200_OK 
    pets = crud.get_pets(db=db)
    return pets

@app.get("/pets/{centerid}",
    response_model=List[schemas.Pet])
def getpetsbycenter(centerid:int,
    response: Response,
    db: Session=Depends(getdb)):
    petsbysesion: List[schemas.Pet] = crud.getpetsbycenter(db,centerid)
    return petsbysesion

@app.post("/pet/{centerid}",
    response_model=schemas.Pet)
def createpet(centerid: int,pet: schemas.PetCreate,db: Session=Depends(getdb)):
    print(pet)
    return crud.create_pet(db,centerid,pet)

@app.get("/centers/",
response_model=List[schemas.Center])
def getcenters(db:Session=Depends(getdb)):
    return crud.get_centers(db)

@app.post("/center/",
    response_model=schemas.Center)
def createcenter(center: schemas.CenterCreate,
                db:Session=Depends(getdb)):
    return crud.create_center(db,center)

@app.post("/photos/{petid}",
    response_model=schemas.PhotoCreate)
def createphoto(petid: int,
                photo: schemas.PhotoCreate,
                db: Session=Depends(getdb)):
    try:
        return crud.create_photo(petid,photo,db)
    except Exception:
        print(str(Exception.args))

@app.get("/photos/",
    response_model=List[schemas.Photo])
def getphotos(db: Session=Depends(getdb)):
    return crud.get_photos(db)

@app.get("/pet/photos/{petid}",
    response_model=List[schemas.Photo])
def getphotosbypet(petid:int,
    db:Session=Depends(getdb)):
    return crud.get_photos_bypet(db,petid)
