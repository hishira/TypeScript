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