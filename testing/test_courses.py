import requests
import pytest

API_URL = "https://api-deepseek.vercel.app/courses"

def test_api_response():
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

        required_keys = ["description", "endDate", "id", "name", "startDate"]
        assert set(required_keys) == set(course.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(course.keys())}"

if __name__ == "__main__":
    pytest.main()
