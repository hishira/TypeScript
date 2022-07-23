from optparse import Option
from typing import Generic, List, Optional, TypeVar
import strawberry
from strawberry import field
T = TypeVar('T')

@strawberry.input
class Filter(Generic[T]):
    eq: Optional[T] = None

@strawberry.input
class GroupFilter(Filter[T]):
    _in: Optional[List[Optional[T]]] = field(name='in',default=None)

@strawberry.input
class NumberFilter(Filter[T]):
    gt: Optional[T] = None
    lg: Optional[T] = None

@strawberry.input
class AdressFilter:
    id: Optional[GroupFilter[int]] = None
    city: Optional[Filter[str]] = None
    country: Optional[Filter[str]] = None
    lat: Optional[NumberFilter[float]] = None
    lng: Optional[NumberFilter[float]] = None

@strawberry.input
class GenderFilter:
    id: Optional[GroupFilter[int]] = None
    value: Optional[Filter[str]] = None;

@strawberry.input
class CenterFilter:
    id: Optional[GroupFilter[int]] = None
    name: Optional[Filter[str]] = None
    address_id: Optional[Filter[int]] = None

@strawberry.input
class BreedFilter:
    id: Optional[GroupFilter[int]] = None
    value: Optional[Filter[str]] = None
    petTypeId: Optional[Filter[int]] = None

@strawberry.input
class PetSizeInput:
    id: Optional[GroupFilter[int]] = None
    value: Optional[Filter[str]] = None

@strawberry.input
class PetInput:
    id: Optional[GroupFilter[int]] = None
    name: Optional[Filter[str]] = None
    petTypeId: Optional[GroupFilter[int]] = None
    petBreedId: Optional[GroupFilter[int]] = None
    petGenderId: Optional[GroupFilter[int]] = None
    petSizeId: Optional[GroupFilter[int]] = None
    centerId: Optional[GroupFilter[int]] = None

@strawberry.input
class PhotoInput:
    id: Optional[GroupFilter[int]] = None
    petId: Optional[GroupFilter[int]] = None