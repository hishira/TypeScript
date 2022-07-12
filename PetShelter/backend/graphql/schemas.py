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
