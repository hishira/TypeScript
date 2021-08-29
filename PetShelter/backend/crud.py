from sqlalchemy.orm import Session
from . import models, schemas

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