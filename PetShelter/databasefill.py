import json
from typing import List
import requests
from random import randint
from datetime import datetime
baseurl: str = f"http://127.0.0.1:8000/"
url: str = f"{baseurl}center/"
headers:dict = {"accept":"application/json","Content-Type":"application/json"}
geturl: str = f"{baseurl}centers/"
getpetsurl: str = f"{baseurl}pets/"

'''
print(datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))
url = f"http://127.0.0.1:8000/pet/"
obj = {
    "name": "Waldek",
    "weight": "123",
    "brithdate": f'{datetime.now()}',
    "pettype": "Cat",
}
'''
#requests.post(url,headers={"accept":"application/json","Content-Type":"application/json"},json=obj)

def getpete(name:str,weight:str,
    brithdate:datetime,
    pettype:str)->dict:
    return {"name":name,
        "weight":weight,
        "brithdate":brithdate,
        "pettype":pettype}

def postcreatepet(pet:dict,url:str,headers:dict):
  return requests.post(url,
      headers=headers,
      json=pet)

def createfirst():
  centers = [
      { "name": "Wesoła łapa",
        "city": "Kraków",
        "address": "Kazimierz Wielkiego 10",
        "phone": "888 323 123", },
      { "name": "Wilczy szaniec",
        "city": "Białystok",
        "address": "Jana Pawła, 20",
        "phone": "674 567 987" },
      { "name": "Szara zagroda",
        "city": "Warszawa",
        "address": "Wiejska 10",
        "phone": "543 890 098s" }
    ]
  for i in centers:
      requests.post(url,headers=headers,json=i)

  pets = [
    getpete("Waldek","7.5",f"{datetime.now()}","Cat"),
    getpete("Szczała","7.5",f"{datetime.now()}","Dog"),
    getpete("Puszek","7.5",f"{datetime.now()}","cat"),
    getpete("Kropeczka","7.5",f"{datetime.now()}","cat"),
    getpete("Fiona","7.5",f"{datetime.now()}","cat"),
    getpete("Mara","7.5",f"{datetime.now()}","cat"),
    getpete("Hina","7.5",f"{datetime.now()}","cat"),
  ]
  response = requests.get(geturl,headers=headers)
  for i in response.json():
    print(i["id"])
    createpeturl: str = f"{baseurl}pet/{i['id']}"
    for i in pets:
      postcreatepet(i,createpeturl,headers)

def createsecond():
  petsphoto: List[str] = [
    "https://cdn.pixabay.com/photo/2017/03/14/16/53/dog-2143721_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/08/22/10/31/cat-3623337_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/02/21/17/58/pet-4868301_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/12/11/17/29/cat-3869354_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/07/23/09/25/eyes-5430849_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/07/30/11/16/cat-5450137_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/04/11/10/51/beautiful-5029893_960_720.jpg"
  ]

  response = requests.get(getpetsurl,headers=headers)
  for pet in response.json():
    print(pet)
    photourl: str = f"{baseurl}photos/{pet['id']}"
    for i in petsphoto[:randint(3,6)]:
      newphoto = {"url":i}
      print(photourl,newphoto)
      requests.post(photourl,headers=headers,json=newphoto)

#createfirst()
createsecond()