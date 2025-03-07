import requests
import pytest
import json

user_id = None # Run test_1_login to get this value.
API_LOGIN = "https://api-deepseek.vercel.app/login"
API_USER_STATS = "https://api-deepseek.vercel.app/user-statistics/{user_id}"
API_USER = "https://api-deepseek.vercel.app/user/{user_id}"

headers = {
  'Content-Type': 'application/json'
}

def test_1_login(student2_name,
                 student2_mail,
                 profile_picture):
    global user_id 
    input_data = {
        "email": student2_mail,
        "name": student2_name,
        "picture": profile_picture
    }
    payload = json.dumps(input_data)

    response = requests.post(API_LOGIN, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    data = response.json()
    user_id = data['userId']

def test_2_user_statistics():
    global user_id 
    response = requests.get(API_USER_STATS.format(user_id=user_id))

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = ["id", "name", "email", "statistics", "registeredCourses", "role"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"

    statistics = data['statistics']    

    assert isinstance(statistics, dict), f"Expected response to be a dict, but is {type(statistics)}"

    required_keys = ["averageScore", "modulesCompleted", "questionsAttempted"]
    assert set(required_keys) == set(statistics.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(statistics.keys())}"

    assert user_id == data['id'], f"Expected response to be same id as used in the query params, but is {data['id']}"

    reg_courses = data['registeredCourses']
    assert isinstance(reg_courses, list), f"Expected response to be a list, but is {type(reg_courses)}"

    assert data['role'] == "student", f"Expected response to be 'student', but is \'{data['role']}\'"

def test_3_user_delete(user_del_success_msg):
    global user_id 
    response = requests.delete(API_USER.format(user_id=user_id))

    data = response.json()
    
    required_keys = ["message"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"

    assert data['message'] == user_del_success_msg, f"Expected response to be \'{user_del_success_msg}\', but is \'{data['message']}\'"

def test_4_user_statistics_user_not_found(server_error_msg):
    global user_id 
    response = requests.get(API_USER_STATS.format(user_id=user_id))

    assert response.status_code == 500, f"Expected status code 404, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()

    required_keys = ["message"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"

    assert data['message'] == server_error_msg, f"Expected response to be \'{server_error_msg}\', but is \'{data['message']}\'"

if __name__ == "__main__":
    pytest.main()
