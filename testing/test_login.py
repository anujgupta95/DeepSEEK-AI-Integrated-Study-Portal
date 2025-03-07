import requests
import pytest
import json
import globals

API_LOGIN = "https://api-deepseek.vercel.app/login"

headers = {
  'Content-Type': 'application/json'
}

def test_1_student_login(student_mail, 
                         student_name, 
                         profile_picture,
                         login_success_msg):
    input_data = {
        "email": student_mail,
        "name": student_name,
        "picture": profile_picture
    }
    payload = json.dumps(input_data)

    response = requests.post(API_LOGIN, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["userId", "name", "email", "role", "message", "picture"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert student_mail == data['email'], f"Expected response to be same email as the login user, but is {data['email']}"

    assert data['message'] == login_success_msg, f"Expected response to be the message \'{login_success_msg}, but is \'{data['message']}\'"

    assert data['role'] == "student", f"Expected response to be 'student', but is \'{data['role']}\'"

def test_2_admin_login(admin_mail,
                       admin_name,
                       profile_picture,
                       login_success_msg):
    input_data = {
    "email": admin_mail,
    "name": admin_name,
    "picture": profile_picture
    }
    payload = json.dumps(input_data)

    response = requests.post(API_LOGIN, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["userId", "name", "email", "role", "message", "picture"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert admin_mail == data['email'], f"Expected response to be same email as the login user, but is {data['email']}"

    assert login_success_msg == "Login successful", f"Expected response to be the message \'{login_success_msg}\', but is \'{data['message']}\'"

    assert data['role'] == "admin", f"Expected response to be 'admin', but is \'{data['role']}\'"

def test_3_faculty_login(faculty_mail,
                         faculty_name,
                         profile_picture,
                         login_success_msg):
    input_data = {
    "email": faculty_mail,
    "name": faculty_name,
    "picture": profile_picture
    }
    payload = json.dumps(input_data)

    response = requests.post(API_LOGIN, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["userId", "name", "email", "role", "message", "picture"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert faculty_mail == data['email'], f"Expected response to be same email as the login user, but is {data['email']}"

    assert data['message'] == login_success_msg, f"Expected response to be the message '{login_success_msg}\', but is \'{data['message']}\'"

    assert data['role'] == "faculty", f"Expected response to be 'faculty', but is \'{data['role']}\'"

def test_4_email_required(student_name,
                          profile_picture,
                          email_required_msg):
    input_data = {
    "email": "",
    "name": student_name,
    "picture": profile_picture
    }
    payload = json.dumps(input_data)

    response = requests.post(API_LOGIN, data=payload, headers=headers)

    assert response.status_code == 400, f"Expected status code 400, but is {response.status_code}"
    
    data = response.json()

    required_keys = ["error"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"
    
    assert data['error'] == email_required_msg, f"Expected response to be error: \'{email_required_msg}\', but is \'{data['error']}\'"

if __name__ == "__main__":
    pytest.main()
