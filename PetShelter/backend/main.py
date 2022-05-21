from fastapi import FastAPI
from . import models
from .utils.database_connection import engine
from fastapi.middleware.cors import CORSMiddleware
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

