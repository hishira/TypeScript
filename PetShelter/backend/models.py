from sqlalchemy import Column,ForeignKey, Integer,String
from sqlalchemy.orm import relationship

from .database import Base

class Pet(Base):
    __tablename__='pet'
    id=Column(Integer,primary_key=True,index=True)
    name=Column(String)
    weight=Column(Integer)

class PetType(Base):
    __talename__="pettype"
    name=Column(String)
    petid=Column(Integer,ForeignKey("pet.id"))
