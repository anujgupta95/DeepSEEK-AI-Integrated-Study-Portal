import requests
import pytest
from globals import verify_keys, assertEquals, assertInstance

API_URL = "https://api-deepseek.vercel.app/users"

def test_list_users():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    users = response.json()
    
    assertInstance(users, list)

    for user in users:
        assertInstance(user, dict)
        
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
