from sqlalchemy import Column,ForeignKey, Integer,String, DateTime, Enum
from sqlalchemy.orm import relationship
import enum
class PetGender(enum.Enum):
    male = "Male"
    female = "Female"
class PetSize(enum.Enum):
    small       = "Small (0-4 kg)"
    medium      = "Medium (5 - 8 kg)"
    large       = "Large (9-15 kg)"
    extralarge  = "Extra Large (16 kg or more)"

class PetType(enum.Enum):
    Dog         = "Dog"
    Cat         = "Cat"
    Other       = "Other"

from .database import Base

class Breed(Base):
    __tablename__ = "breeds"
    id          = Column(Integer, primary_key=True, index=True)
    value       = Column(String, unique=True)
    pettype     = Column(String, Enum(PetType, values_callable=lambda x: [str(e.value) for e in PetType]))

class Pet(Base):
    __tablename__ = "pets"

    id          =     Column(Integer, primary_key=True, index=True)
    name        =     Column(String)
    weight      =     Column(Integer)
    brithdate   =     Column(DateTime)
    pettype     =     Column(String)#Column(Enum(PetType, values_callable=lambda x: [str(e.value) for e in PetType]))
    size        =     Column(String)#Column(Enum(PetSize, values_callable=lambda x: [str(e.value) for e in PetSize]))
    gender      =     Column(String)#Column(Enum(PetGender, values_callable=lambda x: [str(e.value) for e in PetGender]))
    breed_id    =     Column(Integer, ForeignKey("breeds.id"))
    center_id   =     Column(Integer, ForeignKey("centers.id"))
    breed       =     relationship("Breed")
    center      =     relationship("Center")

class Photo(Base):
    __tablename__ = "photos"

    id      =        Column(Integer,primary_key=True,index=True)
    url     =        Column(String)
    pet_id  =        Column(Integer,ForeignKey("pets.id"))
    pet     =        relationship("Pet")

class Center(Base):
    __tablename__ = "centers"

    id      =   Column(Integer,primary_key=True,index=True)
    name    =   Column(String,unique=True)
    city    =   Column(String)
    address =   Column(String)
    phone   =   Column(String)
