import requests
import pytest
import json
from globals import verify_keys, assertEquals, assertTrue, assertInstance

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

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"message":str,
                     "user_id":str
                     }
    verify_keys(required_keys, data)

    assertEquals(data['message'], course_reg_success_msg)

    assertEquals(data['user_id'], student_id)

def test_2_list_registered_courses(student_mail,
                                   course1_id):
    response = requests.get(API_REGISTERED_COURSES.format(email=student_mail))

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"registeredCourses":list}
    verify_keys(required_keys, data)

    courses = data['registeredCourses']
    assertInstance(courses, list)

    set_courses = set()
    for course in courses:
        assertInstance(course, dict)

        required_keys = {"id":str, 
                         "name":str, 
                         "description":str
                         }
        verify_keys(required_keys, course)

        set_courses.add(course['id'])
    # Cannot be assertEquals, due to non-standard message.
    assertTrue(set_courses == {course1_id}, f"Expected response to have following courses: {course1_id}, but found the following keys: {list(set_courses)}") 

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

    assertEquals(response.status_code, 200)

    data = response.json()

    user_id = data['userId']

def test_4_user_delete(student2_mail,
                       user_del_success_msg):
    global user_id 
    response = requests.delete(API_USER.format(user_id=user_id))

    assertEquals(response.status_code, 200)
    
    data = response.json()
    
    required_keys = {"message":str}
    verify_keys(required_keys, data)

    assertEquals(data['message'], user_del_success_msg)

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

    assertEquals(response.status_code, 200)
    
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

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"message":str,
                     "user_id":str}
    verify_keys(required_keys, data)

    assertEquals(data['message'], course_reg_success_msg)

    assertEquals(data['user_id'], user_id)

def test_7_list_registered_courses(student2_mail,
                                 course1_id,
                                 course2_id):
    response = requests.get(API_REGISTERED_COURSES.format(email=student2_mail))

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"registeredCourses":list}
    verify_keys(required_keys, data)

    courses = data['registeredCourses']

    set_courses = set()
    for course in courses:
        assertInstance(course, dict)

        required_keys = {"id":str, 
                         "name":str, 
                         "description":str}
        verify_keys(required_keys, course)

        set_courses.add(course['id'])

    # Cannot be assertEquals, due to non-standard message.
    assertTrue(set_courses == {course1_id, course2_id}, f"Expected response to have following courses: {course1_id, course2_id}, but found the following keys: {list(set_courses)}")

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

    assertEquals(response.status_code, 400)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"details":str,
                     "error":str
                    }
    verify_keys(required_keys, data)

    assertEquals(data['error'], invalid_course_msg)

def test_9_list_registered_courses_without_email(
                          email_required_msg):
    response = requests.get(API_REGISTERED_COURSES.format(email=''))

    assertEquals(response.status_code, 400)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assertEquals(data['error'], email_required_msg)

def test_10_list_registered_courses_invalid_user(invalid_student_mail,
                          user_not_found_msg):
    response = requests.get(API_REGISTERED_COURSES.format(email=invalid_student_mail))

    assertEquals(response.status_code, 404)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assertEquals(data['error'], user_not_found_msg)

def test_11_register_courses_empty_payload(reg_bad_request_msg):
    input_data = {
    }

    headers = {
    'Content-Type': 'application/json'
    }

    payload = json.dumps(input_data)

    response = requests.post(API_REGISTER_COURSE, data=payload, headers=headers)

    assertEquals(response.status_code, 400)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assertEquals(data['error'], reg_bad_request_msg)

if __name__ == "__main__":
    pytest.main()
