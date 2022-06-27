from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class PetBase(BaseModel):
    name: str
    short_description: str
    description: str
    weight: str
    brithdate: datetime


class PhotoBase(BaseModel):
    url: str


class CenterBase(BaseModel):
    name: str
    phone: str
    description: str
    email: str


class PetTypeBase(BaseModel):
    name: str
    other: bool


class PetTypeCreate(PetTypeBase):
    pass


class BreedBase(BaseModel):
    value: str
    pettype_id: int


class GenderBase(BaseModel):
    value: str


class SizeBase(BaseModel):
    value: str


class CenterCreate(CenterBase):
    description: str
    pass


class PhotoCreate(PhotoBase):
    pass


class PetCreate(PetBase):
    pettype_id: int
    breed_id: int
    gender_id: int
    size_id: int


class PetType(PetTypeBase):
    id: int

    class Config:
        orm_mode = True


class Gender(GenderBase):
    id: int

    class Config:
        orm_mode = True


class Size(SizeBase):
    id: int

    class Config:
        orm_mode = True


class Pet(PetCreate):
    id: int
    center_id: int

    class Config:
        orm_mode = True


class Photo(PhotoBase):
    id: int
    pet_id: int

    class Config:
        orm_mode = True

class AddressBase(BaseModel):
    city: str
    address: str
    country: str
    lat: Optional[float]
    lng: Optional[float]


class AddressCreate(AddressBase):
    pass


class Address(AddressBase):
    id: int
    center_id: int

    class Config:
        orm_mode = True
class Center(CenterBase):
    id: int
    address: Address = None

    class Config:
        orm_mode = True


class Breed(BreedBase):
    id: int

    class Config:
        orm_mode = True


