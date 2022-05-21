from typing import List
from fastapi import FastAPI, Depends, Response, status
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .utils.database_connection import engine
from fastapi.middleware.cors import CORSMiddleware
from .utils.database import getdb
from .routers import breed, others, pet
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost:4200"
]
app.add_middleware( CORSMiddleware,
                    allow_origins=origins)
app.include_router(breed.router)
app.include_router(others.router)
app.include_router(pet.router)
@app.get("/")
def read_root():
    return {"Hello":"world"}

