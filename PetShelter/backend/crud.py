from sqlalchemy.orm import Session
from . import models, schemas

def get_pets(db:Session):
    db.query(models.Pet).all()

def create_user(db:Session,
                newpet:schemas.PetCreate):
    new_pet = models.Pet(name=newpet.name,
                weight=newpet.weight,
                brithdate=newpet.brithdate,
                pettype=newpet.pettype,
                )
    db.add(new_pet)
    db.commit()
    db.refresh(new_pet)
    return new_pet