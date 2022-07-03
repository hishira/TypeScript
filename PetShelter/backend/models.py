from email.policy import default
from sqlalchemy import Column, Float, ForeignKey, Integer, String, DateTime, Enum, text
from sqlalchemy.orm import relationship
import enum

from sqlalchemy.sql.sqltypes import Boolean
from sqlalchemy.sql import expression


class PetGender(enum.Enum):
    male = "Male"
    female = "Female"


class PetSize(enum.Enum):
    small = "Small (0-4 kg)"
    medium = "Medium (5 - 8 kg)"
    large = "Large (9-15 kg)"
    extralarge = "Extra Large (16 kg or more)"


class PetType(enum.Enum):
    Dog = "Dog"
    Cat = "Cat"
    Other = "Other"


from .utils.database_connection import Base


class PetType(Base):
    __tablename__ = "pettype"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    other = Column(Boolean,
                   default=False,
                   server_default=expression.false(),
                   nullable=False)
    
    pet = relationship("Pet", back_populates="petType")
    breed = relationship("Breed")


class Breed(Base):
    __tablename__ = "breeds"

    id = Column(Integer, primary_key=True, index=True)
    value = Column(String, unique=True)
    pettype_id = Column(Integer, ForeignKey("pettype.id"))
    
    pet = relationship("Pet", back_populates="breed")


class PetSize(Base):
    __tablename__ = "petsize"

    id = Column(Integer, primary_key=True, index=True)
    value = Column(String, unique=True)
    
    pet = relationship("Pet", back_populates="size")


class PetGender(Base):
    __tablename__ = "gender"

    id = Column(Integer, primary_key=True, index=True)
    value = Column(String, unique=True)
    
    pet = relationship("Pet", back_populates="gender")


class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    weight = Column(Integer)
    brithdate = Column(DateTime)
    short_description = Column(String)
    description = Column(String)
    pettype_id = Column(Integer, ForeignKey("pettype.id"))
    breed_id = Column(Integer, ForeignKey("breeds.id"))
    size_id = Column(Integer, ForeignKey("petsize.id"))
    gender_id = Column(Integer, ForeignKey("gender.id"))
    center_id = Column(Integer, ForeignKey("centers.id"))

    petType = relationship("PetType", back_populates="pet") 
    breed = relationship("Breed", back_populates="pet")
    size = relationship("PetSize", back_populates="pet")
    gender = relationship("PetGender",back_populates="pet")
    center = relationship("Center", back_populates="pet")


class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    pet_id = Column(Integer, ForeignKey("pets.id"))
    pet = relationship("Pet")


class Center(Base):
    __tablename__ = "centers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    phone = Column(String, default=None)
    description = Column(String, default=None)
    email = Column(String, default=None)
    address_id = Column(Integer, ForeignKey("address.id"))
    
    pet = relationship("Pet",back_populates="center")
    address = relationship("Address", back_populates="center")


class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, primary_key=True, index=True)
    city = Column(String, nullable=False)
    address = Column(String, nullable=False)
    country = Column(String, nullable=False)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
    
    center = relationship('Center', back_populates='address')
