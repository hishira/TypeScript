from fastapi import APIRouter, Depends
from requests import Session

from backend import crud, schemas
from ..utils.database import getdb;
router  = APIRouter(prefix="/breed")

@router.post('',response_model=schemas.Breed)
def addBreed(breed: schemas.BreedBase, db: Session=Depends(getdb)):
    return crud.createBreed(db, breed);

@router.get('/dog')
def getDogBreeds(db: Session=Depends(getdb)):
    return crud.getDogBreeds(db)
@router.get('/cat')
def getCatBreeds(db: Session=Depends(getdb)):
    return crud.getCatBreeds(db)

