import typing 
import strawberry
from .schemas import GenderSchema
from strawberry.types import Info
from ..crud import getGender

@strawberry.type
class Query:
    @strawberry.field
    def genders(self,info: Info)-> typing.List[GenderSchema]:
        return getGender(info.context['get_db'])