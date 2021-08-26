import json
import requests
from datetime import datetime
print(datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))
url = f"http://127.0.0.1:8000/pet/"
obj = {
    "name": "Waldek",
    "weight": "123",
    "brithdate": f'{datetime.now()}',
    "pettype": "Cat",
}

requests.post(url,headers={"accept":"application/json","Content-Type":"application/json"},json=obj)