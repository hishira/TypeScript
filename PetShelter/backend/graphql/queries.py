import typing 
import strawberry
from .schemas import GenderSchema,SizeSchema,AdressSchema,CenterSchema
from .input import AdressFilter
from strawberry.types import Info
from ..crud import getGender, getPetSize,getAddresses,get_centers
from typing import Optional

@strawberry.type
class Query:
    @strawberry.field
    def genders(self,info: Info)-> typing.List[GenderSchema]:
        return getGender(info.context['get_db'])
    
    @strawberry.field
    def petsizes(self,info: Info)->typing.List[SizeSchema]:
        return getPetSize(info.context['get_db'])
    
    @strawberry.field
    def addresses(self,info: Info, filter: Optional[AdressFilter] = None)->typing.List[AdressSchema]:
        return getAddresses(info.context['get_db'],filter)

    @strawberry.field
    def centers(self,info: Info)->typing.List[CenterSchema]:
        return get_centers(info.context['get_db'])