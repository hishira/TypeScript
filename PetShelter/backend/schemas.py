from typing import List,Optional
from pydantic import BaseModel
from datetime import datetime

class PetBase(BaseModel):
    name:       str
    weight:     str
    brithdate:  datetime
    pettype:    str

class CenterBase(BaseModel):
    name:       str
    city:       str
    address:    str
    phone:      str

class CenterCreate(CenterBase):
    pass

class PetCreate(PetBase):
    pass


class Center(CenterBase):
    id:         int

    class Config:
        orm_mode = True

class Pet(PetBase):
    id:         int

    class Config:
        orm_mode = True