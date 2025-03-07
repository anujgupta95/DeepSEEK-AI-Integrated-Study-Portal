import requests
import json

API_URL = "https://api-deepseek.vercel.app/user-statistics/abcd"

headers = {
  'Content-Type': 'application/json'
}

input_data = {
"email": "",
"name": "Anand Iyer",
"picture": "https://example.com/profile.jpg"
}
payload = json.dumps(input_data)

response = requests.get(API_URL)

data = response.json()
print(data)