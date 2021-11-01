from typing import List,Optional
from pydantic import BaseModel
from datetime import datetime

class PetBase(BaseModel):
    name:       str
    weight:     str
    brithdate:  datetime
    pettype:    str
    size:       str
    gender:     str


class PhotoBase(BaseModel):
    url:        str


class CenterBase(BaseModel):
    name:       str
    city:       str
    address:    str
    phone:      str

class BreedBase(BaseModel):
    value:      str
    pettype:    str

class CenterCreate(CenterBase):
    pass

class PhotoCreate(PhotoBase):
    pass

class PetCreate(PetBase):
    breed_id:   int
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
    class Config:
        orm_mode = True

class Breed(BreedBase):
    id:        int

    class Config:
        orm_mode = True
