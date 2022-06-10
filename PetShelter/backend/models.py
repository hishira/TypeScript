from sqlalchemy import Column,ForeignKey, Integer,String, DateTime, Enum, text
from sqlalchemy.orm import relationship
import enum

from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.sql import expression
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

from .utils.database_connection import Base

class PetType(Base):
    __tablename__ = "pettype"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String, unique=True)
    other       = Column(Boolean, default=False, server_default=expression.false(), nullable=False)
    pet         = relationship("Pet")
    breed       = relationship("Breed")

class Breed(Base):
    __tablename__ = "breeds"
    
    id          = Column(Integer, primary_key=True, index=True)
    value       = Column(String, unique=True)
    pettype_id  = Column(Integer, ForeignKey("pettype.id"))
    pet         = relationship("Pet")


class PetSize(Base):
    __tablename__ = "petsize"
    
    id          = Column(Integer, primary_key=True, index=True)
    value       = Column(String, unique=True)
    pet         = relationship("Pet")

class PetGender(Base):
    __tablename__ = "gender"
    
    id          = Column(Integer, primary_key=True, index=True)
    value       = Column(String, unique=True)
    pet         = relationship("Pet")
class Pet(Base):
    __tablename__ = "pets"

    id          =     Column(Integer, primary_key=True, index=True)
    name        =     Column(String)
    weight      =     Column(Integer)
    brithdate   =     Column(DateTime)
    pettype_id  =     Column(Integer, ForeignKey("pettype.id"))
    short_description =     Column(String)
    description =     Column(String)

    breed_id    =     Column(Integer, ForeignKey("breeds.id"))#Column(Enum(PetType, values_callable=lambda x: [str(e.value) for e in PetType]))
    size_id     =     Column(Integer, ForeignKey("petsize.id"))#Column(Enum(PetSize, values_callable=lambda x: [str(e.value) for e in PetSize]))
    gender_id   =     Column(Integer, ForeignKey("gender.id"))#Column(Enum(PetGender, values_callable=lambda x: [str(e.value) for e in PetGender]))
    center_id   =     Column(Integer, ForeignKey("centers.id"))



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
    description = Column(String, default=text(""))
    pet     =   relationship("Pet")
