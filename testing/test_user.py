import requests
import pytest
import json
from globals import verify_keys, assertEquals, assertInstance

user_id = None # Run login to get this value.
API_LOGIN = "https://api-deepseek.vercel.app/login"
API_USER = "https://api-deepseek.vercel.app/user/{user_id}"
headers = {
  'Content-Type': 'application/json'
}

def test_1_login(student2_mail,
                 student2_name,
                 profile_picture):
    global user_id 
    input_data = {
        "email": student2_mail,
        "name": student2_name,
        "picture": profile_picture
    }
    payload = json.dumps(input_data)

    response = requests.post(API_LOGIN, data=payload, headers=headers)

    assertEquals(response.status_code, 200)
    
    data = response.json()
    
    user_id = data['userId']

def test_2_user_details():
    global user_id 
    response = requests.get(API_USER.format(user_id=user_id))

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)

    required_keys = {"id":str, 
                     "name":str, 
                     "email":str, 
                     "profilePictureUrl":str, 
                     "registeredCourses":list, 
                     "role":str
                     }
    verify_keys(required_keys, data)
    
    assertEquals(data['id'], user_id)

    assertEquals(data['role'], "student")

def test_3_user_delete(user_del_success_msg):
    global user_id 
    response = requests.delete(API_USER.format(user_id=user_id))

    data = response.json()
    
    required_keys = {"message":str}
    verify_keys(required_keys, data)

    assertEquals(data['message'], user_del_success_msg)

def test_4_user_delete_user_not_found(user_not_found_msg):
    global user_id 
    response = requests.delete(API_USER.format(user_id=user_id))

    data = response.json()
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assertEquals(data['error'], user_not_found_msg)

def test_5_user_details_user_not_found(user_not_found_msg):
    global user_id 
    response = requests.get(API_USER.format(user_id=user_id))

    assertEquals(response.status_code, 404)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)

    required_keys = {"error":str}
    verify_keys(required_keys, data)
    
    assertEquals(data['error'], user_not_found_msg)

if __name__ == "__main__":
    pytest.main()
