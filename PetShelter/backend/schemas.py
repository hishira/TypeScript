from typing import List,Optional
from pydantic import BaseModel
from datetime import datetime

class PetBase(BaseModel):
    name:       str
    weight:     str
    brithdate:  datetime
    pettype:    str

class PetCreate(PetBase):
    pass

class Pet(PetBase):
    id:         int

    class Config:
        orm_mode = True