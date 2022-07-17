from typing import List, Optional
import typing
from fastapi.param_functions import Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_

from backend.graphql.input import AdressFilter, BreedFilter, CenterFilter, GenderFilter
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

def getBreeds(db: Session, filter: Optional[BreedFilter]=None):
    return db.query(models.Breed).\
        filter(*createBreedsFilter(filter)).\
        all()

def createBreedsFilter(filter: Optional[BreedFilter]=None):
    results = []
    if filter:
        if filter.id and filter.id._in:
            results.append(models.Breed.id.in_(filter.id._in))
        if filter.id and filter.id.eq:
            results.append(models.Breed.id == filter.id.eq)
        if filter.value:
            results.append(models.Breed.value == filter.value.eq)
        if filter.petTypeId:
            results.append(models.Breed.petTypeRef.has(models.PetType.id == filter.petTypeId.eq))
    return results

def getDogBreeds(db: Session):
    return db.query(models.Breed). \
        join(models.PetType, models.Breed.pettype_id == models.PetType.id). \
        filter(models.PetType.name == "Dog"). \
        all()

def getGender(db: Session, filter: Optional[GenderFilter]):
    return db.query(models.PetGender).\
        filter(*getGenderFilter(filter)).\
        all()

def getGenderFilter(filter: Optional[GenderFilter]):
    results = []
    if filter:
        if filter.id and filter.id._in:
            results.append(models.PetGender.id.in_(filter.id._in))
        if filter.id and filter.id.eq:
            results.append(models.PetGender.id == filter.id.eq)
        if filter.value:
            results.append(models.PetGender.value == filter.value.eq)
    return results

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

def get_centers(db: Session, filter: Optional[CenterFilter] = None):
    return db.query(models.Center).\
        filter(*getCenterFilter(filter)).\
        all()

def getCenterFilter(filter: Optional[CenterFilter] = None):
    results = []
    if filter:
        if filter.id and filter.id._in:
            results.append(models.Center.id.in_(filter.id._in))
        if filter.id and filter.id.eq:
            results.append(models.Center.id == filter.id.eq)
        if filter.name:
            results.append(models.Center.name == filter.name.eq)
        if filter.address_id:
            results.append(models.Center.address.has(models.Address.id == filter.address_id.eq))
    return results

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
    if filter:
        if filter.id and filter.id._in:
            results.append(models.Address.id.in_(filter.id._in))
        if filter.id and filter.id.eq:
            results.append(models.Address.id == filter.id.eq)
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