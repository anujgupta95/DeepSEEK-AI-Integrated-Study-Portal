import requests
import pytest
import json

API_URL = "https://api-deepseek.vercel.app/login"

headers = {
  'Content-Type': 'application/json'
}

def test_1_student_login():
    input_data = {
    "email": "21f1001185@ds.study.iitm.ac.in",
    "name": "Anand Iyer",
    "picture": "https://example.com/profile.jpg"
    }
    payload = json.dumps(input_data)

    response = requests.post(API_URL, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["userId", "name", "email", "role", "message", "picture"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert input_data['email'] == data['email'], f"Expected response to be same email as the login user, but is {data['email']}"

    assert data['message'] == "Login successful", f"Expected response to be the message 'Login successful', but is \'{data['message']}\'"

    assert data['role'] == "student", f"Expected response to be 'student', but is \'{data['role']}\'"

def test_2_admin_login():
    input_data = {
    "email": "admin@example.com",
    "name": "Admin User",
    "picture": "https://example.com/profile.jpg"
    }
    payload = json.dumps(input_data)

    response = requests.post(API_URL, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["userId", "name", "email", "role", "message", "picture"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert input_data['email'] == data['email'], f"Expected response to be same email as the login user, but is {data['email']}"

    assert data['message'] == "Login successful", f"Expected response to be the message 'Login successful', but is \'{data['message']}\'"

    assert data['role'] == "admin", f"Expected response to be 'admin', but is \'{data['role']}\'"

def test_3_faculty_login():
    input_data = {
    "email": "faculty@example.com",
    "name": "Faculty User",
    "picture": "https://example.com/profile.jpg"
    }
    payload = json.dumps(input_data)

    response = requests.post(API_URL, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["userId", "name", "email", "role", "message", "picture"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert input_data['email'] == data['email'], f"Expected response to be same email as the login user, but is {data['email']}"

    assert data['message'] == "Login successful", f"Expected response to be the message 'Login successful', but is \'{data['message']}\'"

    assert data['role'] == "faculty", f"Expected response to be 'faculty', but is \'{data['role']}\'"

def test_4_email_required():
    input_data = {
    "email": "",
    "name": "Anand Iyer",
    "picture": "https://example.com/profile.jpg"
    }
    payload = json.dumps(input_data)

    response = requests.post(API_URL, data=payload, headers=headers)

    assert response.status_code == 400, f"Expected status code 400, but is {response.status_code}"
    
    data = response.json()

    required_keys = ["error"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert data['error'] == 'Email is required', f"Expected response to be error: 'Email is required', but is {data['error']}"

if __name__ == "__main__":
    pytest.main()
