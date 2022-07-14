from typing import List, Optional
import typing
from fastapi.param_functions import Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from backend.graphql.input import AdressFilter
from . import models, schemas
from itertools import groupby
from operator import attrgetter

def createBreed(db: Session, newbreed: schemas.BreedBase):
    newBreed = models.Breed(value=newbreed.value, pettype_id=newbreed.pettype_id)
    db.add(newBreed)
    db.commit()
    db.refresh(newBreed)
    return newBreed

def getPetTypes(db: Session):
    return db.query(models.PetType).all()

def getDogBreeds(db: Session):
    return db.query(models.Breed). \
        join(models.PetType, models.Breed.pettype_id == models.PetType.id). \
        filter(models.PetType.name == "Dog"). \
        all()

def getGender(db: Session):
    return db.query(models.PetGender).all()

def getPetSize(db: Session):
    return db.query(models.PetSize).all()

def getCatBreeds(db: Session):
    return db.query(models.Breed). \
        join(models.PetType, models.Breed.pettype_id == models.PetType.id). \
        filter(models.PetType.name == "Cat"). \
        all()

def get_pets(db: Session):
    return db.query(models.Pet).all()

def create_pet(db: Session,
                center_id: int,
                newpet: schemas.PetCreate):
    new_pet = models.Pet(name=newpet.name,
                short_description=newpet.short_description,
                description=newpet.description,
                weight=newpet.weight,
                brithdate=newpet.brithdate,
                pettype_id=newpet.pettype_id,
                breed_id=newpet.breed_id,
                size_id=newpet.size_id,
                gender_id=newpet.gender_id,
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
    return db.query(models.Pet). \
        join(models.PetType, models.Pet.pettype_id == models.PetType.id). \
            filter(models.PetType.name == "Dog"). \
            all()

def getPetOnlyDog(db: Session):
    return db.query(models.Pet). \
        join(models.PetType, models.Pet.pettype_id == models.PetType.id). \
        filter(models.PetType.name == "Cat"). \
        all()
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
    result = db.query(models.Center).filter(models.Center.id==centerid).first()
    print(result.description)
    return result

def get_centers(db: Session):
    return db.query(models.Center).\
        join(models.Address,models.Center.address_id==models.Address.id).all()

def create_center(db: Session,
                  newcenter: schemas.CenterCreate):
    new_center = models.Center( name=newcenter.name,
                                city=newcenter.city,
                                address=newcenter.address,
                                phone=newcenter.phone,
                                email = newcenter.email
                                )
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

def getPossiblePetFilter(db: Session):
    return db.query(models.Pet, models.Breed).join(models.Breed).with_entities(models.Pet.breed_id, models.Breed.value)

def getPetById(db: Session, petid: int) -> schemas.Pet:
    return db.query(models.Pet).filter(models.Pet.id == petid).one_or_none()

def getAddresses(db: Session, filter: Optional[AdressFilter]) -> typing.List[schemas.Address]:
    return db.query(models.Address).\
        filter(*createAdressFilter(filter)).all()

def createAdressFilter(filter: Optional[AdressFilter]): 
    results = []
    print(filter)
    if filter:
        if filter.id._in:
            results.append(models.Address.id.in_(filter.id._in))
        if filter.city:
            results.append(models.Address.city == filter.city.eq)
        if filter.country:
            results.append(models.Address.country == filter.country.eq)
        if filter.lat and filter.lat.lg:
            results.append(models.Address.lat < filter.lat.lg )
        if filter.lat and filter.lat.gt:
            results.append(models.Address.lat > filter.lat.gt )
        if filter.lng and filter.lng.lg:
            results.append(models.Address.lng < filter.lng.lg )
        if filter.lng and filter.lng.gt:
            results.append(models.Address.lng > filter.lng.gt )

    return results