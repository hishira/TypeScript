from datetime import datetime
import typing
import strawberry

@strawberry.type
class GenderSchema:
    id: int
    value: str

@strawberry.type
class SizeSchema:
    id: int
    value: str

@strawberry.type
class PetTypeSchema:
    id: int
    name: str
    other: bool

@strawberry.type
class BreedSchema:
    id: int
    value: str
    pettype_id: int
    petTypeRef: PetTypeSchema
@strawberry.type
class AdressSchema:
    id: int
    city: str
    address: str
    country: str
    lat: typing.Optional[float]
    lng: typing.Optional[float]

@strawberry.type
class CenterSchema:
    id: int
    name: str
    phone: str
    description: str
    email: str
    address_id: int
    address: 'AdressSchema'

@strawberry.type
class PhotoSchema:
    id: int
    url: str
    pet_id: int
    pet: 'PetSchema'

@strawberry.type
class PetSchema:
    id: int
    name: str
    short_description: str
    description: str
    weight: str
    brithdate: datetime
    pettype_id: int
    breed_id: int
    gender_id: int
    size_id: int
    center_id: int

    center: CenterSchema
    breed: BreedSchema
    gender: GenderSchema
    size: SizeSchema
    petType: PetTypeSchema
    photos: typing.List[PhotoSchema]