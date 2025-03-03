import requests

API_URL = "https://api-deepseek.vercel.app/courses"
response = requests.get(API_URL)
print(response.headers["Content-Type"])
data = response.json()
print(type(data))
print(len(data['courses']))
for each in data['courses']:
    print(each)