from sqlalchemy import Column,ForeignKey, Integer,String, Date
from sqlalchemy.orm import relationship

from .database import Base

class Pet(Base):
    __tablename__='pet'
    id =         Column(Integer,primary_key=True,index=True)
    name =       Column(String)
    weight =     Column(Integer)
    birthdate =  Column(Date)
    pettype =    Column(String)