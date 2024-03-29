import typing 
import strawberry
from .schemas import BreedSchema, GenderSchema, PetSchema, PetTypeSchema, PhotoSchema,SizeSchema,AdressSchema,CenterSchema
from .input import AdressFilter, BreedFilter, CenterFilter, GenderFilter, PetInput, PetSizeInput, PhotoInput
from strawberry.types import Info
from ..crud import get_pets, get_photos, getBreeds, getGender, getPetSize,getAddresses,get_centers, getPetTypes
from typing import Optional

@strawberry.type
class Query:
    @strawberry.field
    def genders(self,info: Info, filter: Optional[GenderFilter]=None)-> typing.List[GenderSchema]:
        return getGender(info.context['get_db'], filter)
    
    @strawberry.field
    def pettypes(self, info: Info) -> typing.List[PetTypeSchema]:
        return getPetTypes(info.context['get_db'])

    @strawberry.field
    def breeds(self, info: Info, filter: Optional[BreedFilter] = None) -> typing.List[BreedSchema]:
        return getBreeds(info.context['get_db'], filter)

    @strawberry.field
    def petsizes(self,info: Info, filter: Optional[PetSizeInput] = None)->typing.List[SizeSchema]:
        return getPetSize(info.context['get_db'], filter)
    
    @strawberry.field
    def addresses(self,info: Info, filter: Optional[AdressFilter] = None)->typing.List[AdressSchema]:
        return getAddresses(info.context['get_db'],filter)

    @strawberry.field
    def centers(self,info: Info, filter: Optional[CenterFilter] = None)->typing.List[CenterSchema]:
        return get_centers(info.context['get_db'], filter)
    
    @strawberry.field
    def pets(self, info: Info, filter: Optional[PetInput] = None) ->typing.List[PetSchema]:
        return get_pets(info.context['get_db'], filter)

    @strawberry.field
    def photos(self,info: Info, filter: Optional[PhotoInput]=None) ->typing.List[PhotoSchema]:
        return get_photos(info.context['get_db'], filter)