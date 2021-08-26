from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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

@app.post("/pet/",
    response_model=schemas.Pet)
def createpet(pet: schemas.PetCreate,db: Session=Depends(getdb)):
    print(pet)
    return crud.create_pet(db,pet)