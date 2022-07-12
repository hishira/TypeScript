from fastapi import Depends, FastAPI
from . import models
from .utils.database_connection import engine
from fastapi.middleware.cors import CORSMiddleware
from .routers import breed, others, pet
import strawberry
from strawberry.fastapi import GraphQLRouter
from .graphql.queries import Query
models.Base.metadata.create_all(bind=engine)
from .utils.database import getdb

def get_context(custom_context = Depends(getdb)):
        return {"get_db":custom_context}
schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema, context_getter=get_context)
app = FastAPI()
origins = [
    "http://localhost:4200"
]

app.add_middleware( CORSMiddleware,
                    allow_origins=origins)
app.include_router(breed.router)
app.include_router(others.router)
app.include_router(pet.router)
app.include_router(graphql_app,prefix="/graphql")
@app.get("/")
def read_root():
    return {"Hello":"world"}

