import requests
import pytest
from globals import verify_keys

API_URL = "https://api-deepseek.vercel.app/users"

def test_list_users():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    users = response.json()
    
    assert isinstance(users, list), f"Expected response to be a list, but is {type(users)}"

    for user in users:        
        assert isinstance(user, dict), f"Expected response to be a dict, but is {type(user)}"
        
        required_keys = {"id":str, 
                         "name":str, 
                         "profilePictureUrl":str, 
                         "registeredCourses":list, 
                         "role":str, 
                         "email":str
                         }
        verify_keys(required_keys, user)

if __name__ == "__main__":
    pytest.main()
