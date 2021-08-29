from sqlalchemy import Column,ForeignKey, Integer,String, DateTime
from sqlalchemy.orm import relationship

from .database import Base

class Pet(Base):
    __tablename__ = "pets"

    id =         Column(Integer,primary_key=True,index=True)
    name =       Column(String)
    weight =     Column(Integer)
    brithdate =  Column(DateTime)
    pettype =    Column(String)
    center_id = Column(Integer,ForeignKey("centers.id"))
    center=      relationship("Center", back_populates="pets")

class Center(Base):
    __tablename__ = "centers"

    id      =   Column(Integer,primary_key=True,index=True)
    name    =   Column(String,unique=True)
    city    =   Column(String)
    address =   Column(String)
    phone   =   Column(String)
    pets    =   relationship("Pet",back_populates="center")