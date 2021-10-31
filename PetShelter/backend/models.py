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
    dog         = "Dog"
    cat         = "Cat"
    other       = "Other"

from .database import Base

class Breed(Base):
    __tablename__ = "breeds"
    id          = Column(Integer, primary_key=True, index=True)
    value       = Column(String, unique=True)
    pettype     = Column(String, Enum(PetType))
class Pet(Base):
    __tablename__ = "pets"

    id          =     Column(Integer,primary_key=True,index=True)
    name        =     Column(String)
    weight      =     Column(Integer)
    brithdate   =     Column(DateTime)
    pettype     =     Column(String, Enum(PetType))
    breed       =     Column(Integer, ForeignKey("breeds.id"))
    size        =     Column("size_value", Enum(PetSize))
    gender      =     Column("gender_value",Enum(PetGender))
    center_id   =     Column(Integer,ForeignKey("centers.id"))
    center      =     relationship("Center", back_populates="pets")
    photos      =     relationship("Photo", back_populates="pet")

class Photo(Base):
    __tablename__ = "photos"

    id      =        Column(Integer,primary_key=True,index=True)
    url     =        Column(String)
    pet_id  =        Column(Integer,ForeignKey("pets.id"))
    pet     =        relationship("Pet", back_populates="photos")

class Center(Base):
    __tablename__ = "centers"

    id      =   Column(Integer,primary_key=True,index=True)
    name    =   Column(String,unique=True)
    city    =   Column(String)
    address =   Column(String)
    phone   =   Column(String)
    pets    =   relationship("Pet", back_populates="center")