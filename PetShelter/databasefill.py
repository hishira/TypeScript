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
url = f"http://127.0.0.1:8000/center/"
headers = {"accept":"application/json","Content-Type":"application/json"}
for i in centers:
    requests.post(url,headers=headers,json=i)
