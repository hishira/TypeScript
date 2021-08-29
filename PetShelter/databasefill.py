import json
import requests
from datetime import datetime
'''
print(datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))
url = f"http://127.0.0.1:8000/pet/"
obj = {
    "name": "Waldek",
    "weight": "123",
    "brithdate": f'{datetime.now()}',
    "pettype": "Cat",
}

requests.post(url,headers={"accept":"application/json","Content-Type":"application/json"},json=obj)
'''
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


baseurl: str = f"http://127.0.0.1:8000/"
url: str = f"{baseurl}center/"
headers:dict = {"accept":"application/json","Content-Type":"application/json"}

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
geturl: str = f"{baseurl}centers/"
response = requests.get(geturl,headers=headers)
for i in response.json():
  print(i["id"])
  createpeturl: str = f"{baseurl}pet/{i['id']}"
  for i in pets:
    postcreatepet(i,createpeturl,headers)
