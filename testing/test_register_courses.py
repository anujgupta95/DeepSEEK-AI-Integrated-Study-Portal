import requests
import pytest
import json
from globals import verify_keys

user_id = None
API_REGISTER_COURSE = "https://api-deepseek.vercel.app/registered-courses"
API_REGISTERED_COURSES = "https://api-deepseek.vercel.app/registered-courses?email={email}"
API_LOGIN = "https://api-deepseek.vercel.app/login"
API_USER = "https://api-deepseek.vercel.app/user/{user_id}"

headers = {
  'Content-Type': 'application/json'
}

def test_1_register_course(student_mail, 
                          student_id,
                          course1_id,
                          course_reg_success_msg):
    input_data = {
        "email": student_mail,
        "courses": [
            course1_id
        ]
    }

    headers = {
    'Content-Type': 'application/json'
    }

    payload = json.dumps(input_data)

    response = requests.post(API_REGISTER_COURSE, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"message":str,
                     "user_id":str
                     }
    verify_keys(required_keys, data)

    assert data['message'] == course_reg_success_msg, f"Expected response to be the message \'{course_reg_success_msg}\', but is \'{data['message']}\'"

    assert data['user_id'] == student_id, f"Expected response to be the {student_id}, but is {data['user_id']}"

def test_2_list_registered_courses(student_mail,
                                   course1_id):
    response = requests.get(API_REGISTERED_COURSES.format(email=student_mail))

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"registeredCourses":list}
    verify_keys(required_keys, data)

    courses = data['registeredCourses']
    assert isinstance(courses, list), f"Expected response to be a dict, but is {type(courses)}"

    set_courses = set()
    for course in courses:
        assert isinstance(course, dict), f"Expected response to be a dict, but is {type(course)}"

        required_keys = {"id":str, 
                         "name":str, 
                         "description":str
                         }
        verify_keys(required_keys, course)

        set_courses.add(course['id'])
    assert set_courses == {course1_id}, f"Expected response to have following courses: {course1_id}, but found the following keys: {list(set_courses)}"

def test_3_identify_user(student2_mail,
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

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    data = response.json()
    user_id = data['userId']

def test_4_user_delete(student2_mail,
                       user_del_success_msg):
    global user_id 
    response = requests.delete(API_USER.format(user_id=user_id))

    data = response.json()
    
    required_keys = {"message":str}
    verify_keys(required_keys, data)

    assert data['message'] == user_del_success_msg, f"Expected response to be \'{user_del_success_msg}\', but is \'{data['message']}\'"

def test_5_create_user(student2_mail, 
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

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    data = response.json()
    user_id = data['userId']

def test_6_register_two_courses(student2_mail,
                          course1_id,
                          course2_id,
                          course_reg_success_msg):
    input_data = {
        "email": student2_mail,
        "courses": [
            course1_id, course2_id
        ]
    }

    headers = {
    'Content-Type': 'application/json'
    }

    payload = json.dumps(input_data)

    response = requests.post(API_REGISTER_COURSE, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"message":str,
                     "user_id":str}
    verify_keys(required_keys, data)

    assert data['message'] == course_reg_success_msg, f"Expected response to be the message \'{course_reg_success_msg}\', but is \'{data['message']}\'"

    assert data['user_id'] == user_id, f"Expected response to be {user_id}, but is {data['user_id']}"

def test_7_list_registered_courses(student2_mail,
                                 course1_id,
                                 course2_id):
    response = requests.get(API_REGISTERED_COURSES.format(email=student2_mail))

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"registeredCourses":list}
    verify_keys(required_keys, data)

    courses = data['registeredCourses']

    set_courses = set()
    for course in courses:
        assert isinstance(course, dict), f"Expected response to be a dict, but is {type(course)}"

        required_keys = {"id":str, 
                         "name":str, 
                         "description":str}
        verify_keys(required_keys, course)

        set_courses.add(course['id'])
    assert set_courses == {course1_id, course2_id}, f"Expected response to have following courses: {course1_id, course2_id}, but found the following keys: {list(set_courses)}"

def test_8_register_invalid_course(student_mail, 
                          student_id,
                          invalid_course_id,
                          invalid_course_msg):
    input_data = {
        "email": student_mail,
        "courses": [
            invalid_course_id
        ]
    }

    headers = {
    'Content-Type': 'application/json'
    }

    payload = json.dumps(input_data)

    response = requests.post(API_REGISTER_COURSE, data=payload, headers=headers)

    assert response.status_code == 400, f"Expected status code 400, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"details":str,
                     "error":str
                    }
    verify_keys(required_keys, data)

    assert data['error'] == invalid_course_msg, f"Expected response to be the message \'{invalid_course_msg}\', but is \'{data['error']}\'"

def test_9_list_registered_courses_without_email(
                          email_required_msg):
    response = requests.get(API_REGISTERED_COURSES.format(email=''))

    assert response.status_code == 400, f"Expected status code 400, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assert data['error'] == email_required_msg, f"Expected response to be the message \'{email_required_msg}\', but is \'{data['error']}\'"

if __name__ == "__main__":
    pytest.main()
