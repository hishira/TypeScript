from fastapi.param_functions import Query
from sqlalchemy.orm import Session
from . import models, schemas
from itertools import groupby
from operator import attrgetter

def get_pets(db: Session):
    return db.query(models.Pet).all()

def create_pet(db: Session,
                center_id: int,
                newpet: schemas.PetCreate):
    new_pet = models.Pet(name=newpet.name,
                weight=newpet.weight,
                brithdate=newpet.brithdate,
                pettype=newpet.pettype,
                center_id=center_id
                )
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet

def getpetsbycenter(db:Session,
    centerid:int):
    pets: Query[models.Pet] = db.query(models.Pet)
    filteredpets = pets.filter(models.Pet.center_id==centerid).all()
    return filteredpets

def getPetOnlyCats(db:Session):
    return db.query(models.Pet).filter(models.Pet.pettype == "Cat").all();

def getpetsbycenterwithfoto(db: Session,
    centerid: int):
    allelements = db.query(models.Pet,models.Photo).\
        filter(models.Pet.center_id == centerid).\
        join(models.Photo,models.Pet.id == models.Photo.pet_id).\
        order_by(models.Pet.id).\
        all()
    for k,g in groupby(allelements,attrgetter("Pet.id")):
        print(list(g))
    #return allelements
    return {k:list(g) for k,g in groupby(allelements,attrgetter("Pet.id"))}

def getcenterinfo(db:Session,centerid:int):
    return db.query(models.Center).filter(models.Center.id==centerid).first()

def get_centers(db: Session):
    return db.query(models.Center).all()

def create_center(db: Session,
                  newcenter: schemas.CenterCreate):
    new_center = models.Center( name=newcenter.name,
                                city=newcenter.city,
                                address=newcenter.address,
                                phone=newcenter.phone)
    db.add(new_center)
    db.commit()
    db.refresh(new_center)
    return new_center

def create_photo(petid:int,
            newphoto:schemas.PhotoCreate,db:Session):
    new_photo = models.Photo(url=newphoto.url,
            pet_id=petid)
    db.add(new_photo)
    db.commit()
    db.refresh(new_photo)
    return new_photo

def get_photos(db:Session):
    return db.query(models.Photo).all()

def get_photos_bypet(db: Session, petid: int):
    return db.query(models.Photo).filter(models.Photo.pet_id == petid).all()
