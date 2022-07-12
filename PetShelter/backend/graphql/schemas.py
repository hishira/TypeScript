import typing
import strawberry

@strawberry.type
class GenderSchema:
    id: int
    value: str
