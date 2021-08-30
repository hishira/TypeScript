from typing import List,Optional
from pydantic import BaseModel
from datetime import datetime

class PetBase(BaseModel):
    name:       str
    weight:     str
    brithdate:  datetime
    pettype:    str

class PhotoBase(BaseModel):
    url:        str


class CenterBase(BaseModel):
    name:       str
    city:       str
    address:    str
    phone:      str

class CenterCreate(CenterBase):
    pass

class PhotoCreate(PhotoBase):
    pass

class PetCreate(PetBase):
    pass

class Pet(PetBase):
    id:         int
    center_id:  int

    class Config:
        orm_mode = True

class Photo(PhotoBase):
    id:         int
    pet_id:     int

    class Config:
        orm_mode = True

class Center(CenterBase):
    id:         int
    pets:       List[Pet]

    class Config:
        orm_mode = True
