import requests
import pytest
from globals import verify_keys

API_URL = "https://api-deepseek.vercel.app/courses"

def test_list_courses():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    assert len(data['courses']) > 0, "Expected response to contain at least one course"

    courses = data['courses'];
    assert isinstance(courses, list), f"Expected response to be a list, but is {type(courses)}"

    for course in courses:
        assert isinstance(course, dict), f"Expected response to be a dict, but is {type(course)}"

        required_keys = {"description":str,
                         "endDate":str,
                         "id":str,
                         "name":str,
                         "startDate":str
                         }
        verify_keys(required_keys, course)

if __name__ == "__main__":
    pytest.main()
