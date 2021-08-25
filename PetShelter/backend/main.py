from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
class Pet(BaseModel):
    name:str
    type: str
    weight: int

app = FastAPI()
@app.get("/")
def read_root():
    return {"Hello":"world"}