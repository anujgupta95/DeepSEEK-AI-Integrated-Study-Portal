import requests
import pytest
import json

user_id = None # Run login to get this value.
LOGIN_API_URL = "https://api-deepseek.vercel.app/login"
USER_API_URL = "https://api-deepseek.vercel.app/user/{user_id}"
headers = {
  'Content-Type': 'application/json'
}

def test_1_login():
    global user_id 
    input_data = {
    "email": "21f1001185@ds.study.iitm.ac.in",
    "name": "Anand Iyer",
    "picture": "https://example.com/profile.jpg"
    }
    payload = json.dumps(input_data)

    response = requests.post(LOGIN_API_URL, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    data = response.json()
    user_id = data['userId']

def test_2_user_details():
    global user_id 
    # user_id = "67c72978a6c689ef424c0c6c"
    response = requests.get(USER_API_URL.format(user_id=user_id))

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["id", "name", "email", "profilePictureUrl", "registeredCourses", "role"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert user_id == data['id'], f"Expected response to be same email as used in the query params, but is {data['id']}"

    reg_courses = data['registeredCourses']
    assert isinstance(reg_courses, list), f"Expected response to be a list, but is {type(reg_courses)}"

    assert data['role'] == "student", f"Expected response to be 'student', but is \'{data['role']}\'"

def test_3_user_delete():
    global user_id 
    # user_id = "67c72978a6c689ef424c0c6c"
    response = requests.delete(USER_API_URL.format(user_id=user_id))

    data = response.json()
    
    required_keys = ["message"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"

    assert data['message'] == "User deleted successfully", f"Expected response to be 'User deleted successfully', but is \'{data['message']}\'"

def test_4_user_delete_User_not_found():
    global user_id 
    # user_id = "67c72978a6c689ef424c0c6c"
    response = requests.delete(USER_API_URL.format(user_id=user_id))

    assert response.status_code == 404, f"Expected status code 404, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    required_keys = ["error"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"

    assert data['error'] == "User not found", f"Expected response to be 'User not found', but is \'{data['error']}\'"

def test_5_user_details_user_not_found():
    global user_id 
    # user_id = "67c72978a6c689ef424c0c6c"
    response = requests.get(USER_API_URL.format(user_id=user_id))

    assert response.status_code == 404, f"Expected status code 404, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["error"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert data['error'] == 'User not found', f"Expected response to be error: 'Invalid user ID', but is {data['error']}"

if __name__ == "__main__":
    pytest.main()
