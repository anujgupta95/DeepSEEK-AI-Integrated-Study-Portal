import requests
import pytest

API_URL = "https://api-deepseek.vercel.app/users"

def test_api_response():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    users = data;
    
    assert isinstance(users, list), f"Expected response to be a list, but is {type(users)}"

    for user in users:        
        assert isinstance(user, dict), f"Expected response to be a dict, but is {type(user)}"
        
        required_keys = ["id", "name", "profilePictureUrl", "registeredCourses", "role", "email"]
        assert set(required_keys) == set(user.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(user.keys())}"
        
        reg_courses = user['registeredCourses']
        assert isinstance(reg_courses, list), f"Expected response to be a list, but is {type(reg_courses)}"

if __name__ == "__main__":
    pytest.main()
