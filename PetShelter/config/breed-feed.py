import requests
import json
import os
from bs4 import BeautifulSoup
DOGSBREEDSFILE    = './dogs-breeds.json'
DOGSBREEDSFILETXT = './dogs-breeds.txt'
CATSBREEDSFILE    = './cats-breeds.json'
CATSBREEDSFILETXT = './cats-breeds.txt'

if not os.path.exists(DOGSBREEDSFILE):
    res = requests.get('https://dog.ceo/api/breeds/list/all')
    resjson = json.loads(res.text)
    #print(resjson)

    with open('dogs-breeds.json', 'w') as file:
        json.dump(resjson,file)
else:
    if not os.path.exists(DOGSBREEDSFILETXT):
        newsnames = []
        with open(DOGSBREEDSFILE) as dogs_json:
            data = json.load(dogs_json)
            for i in data['message']:
                firstname = i
                newsnames.append(firstname)
                for j in data['message'][firstname]:
                    name = f"{firstname} {j}"
                    newsnames.append(name)
        with open(DOGSBREEDSFILETXT, 'w') as file:
            for i in newsnames:
                file.write(f"{i}\n")
if not os.path.exists('./cats-breeds.txt'):
    html_doc = requests.get('https://cfa.org/breeds/')
    html_doc = html_doc.text
    soup = BeautifulSoup(html_doc,'html.parser')
    catsbyclass = soup.find_all('h5',{"class": ['elementor-heading-title','elementor-size-default']})
    catsname = []
    for i in catsbyclass:
        catsname.append(i.text)
    with open(CATSBREEDSFILETXT,'w') as file:
        for i in catsname:
            file.write(f"{i}\n")

            