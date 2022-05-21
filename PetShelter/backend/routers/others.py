from typing import List
from fastapi import APIRouter, Depends, status

from backend import crud, schemas
from ..utils.database import getdb;
from requests import Session

router = APIRouter()

@router.get("/pettypes", response_model=List[schemas.PetType])
def getPetTypes(db: Session=Depends(getdb)):
    return crud.getPetTypes(db)

@router.get("/gender", response_model=List[schemas.Gender])
def getPetGender(db: Session=Depends(getdb)):
    return crud.getGender(db)

@router.get("/petsize", response_model=List[schemas.Size])
def getPetSize(db: Session=Depends(getdb)):
    return crud.getPetSize(db)

@router.get("/pets/",
    response_model=List[schemas.Pet])
def getallpets(db: Session=Depends(getdb)):
    pets = crud.get_pets(db=db)
    return pets

@router.get("/pets/{centerid}",
    response_model=List[schemas.Pet])
def getpetsbycenter(centerid:int,
    db: Session=Depends(getdb)):
    petsbysesion: List[schemas.Pet] = crud.getpetsbycenter(db,centerid)
    return petsbysesion


@router.get("/centers", response_model=List[schemas.Center])
def getcenters(db:Session=Depends(getdb)):
    return crud.get_centers(db)

@router.post("/center/",
    response_model=schemas.Center)
def createcenter(center: schemas.CenterCreate,
                db:Session=Depends(getdb)):
    return crud.create_center(db,center)

@router.post("/photos/{petid}",
    response_model=schemas.Photo)
def createphoto(petid: int,
                photo: schemas.PhotoCreate,
                db: Session=Depends(getdb)):
    try:
        return crud.create_photo(petid,photo,db)
    except Exception:
        print(str(Exception.args))

@router.get("/photos/",
    response_model=List[schemas.Photo])
def getphotos(db: Session=Depends(getdb)):
    return crud.get_photos(db)

@router.get("/centers/{id}",
    response_model=schemas.Center)
def getcenterbyid(id:int,
    db:Session=Depends(getdb)):
    return crud.getcenterinfo(db,id)

@router.get("/pets/photo/{centerid}")
def getpetwithphotos(centerid:int,
    db:Session=Depends(getdb)):
    return crud.getpetsbycenterwithfoto(db,centerid)

