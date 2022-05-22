from typing import List
from fastapi import APIRouter, Depends

from backend import crud, schemas
from ..utils.database import getdb;
from requests import Session

router = APIRouter(prefix='/pet')

@router.post("/{centerid}",
    response_model=schemas.Pet)
def createpet(centerid: int,pet: schemas.PetCreate,db: Session=Depends(getdb)):
    print(pet)
    return crud.create_pet(db,centerid,pet)

@router.get("/photos/{petid}",
    response_model=List[schemas.Photo])
def getphotosbypet(petid:int,
    db:Session=Depends(getdb)):
    return crud.get_photos_bypet(db,petid)

@router.get("/getallcat",
    response_model=List[schemas.Pet])
def getAllCats(db: Session=Depends(getdb)):
    return crud.getPetOnlyCats(db)

@router.get("/getalldog",
    response_model=List[schemas.Pet])
def getAllDogs(db: Session=Depends(getdb)):
    return crud.getPetOnlyDog(db)

@router.get("/petpossiblefilters")
def getAllPossibleFilter(db: Session=Depends(getdb)):
    return crud.getPossiblePetFilter(db)