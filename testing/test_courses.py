import requests
import pytest
from globals import verify_keys, assertEquals, assertTrue, assertInstance

API_URL = "https://api-deepseek.vercel.app/courses"

def test_list_courses():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    courses = data['courses']
    
    assertTrue(len(courses) > 0, "Expected response to contain at least one course")

    assertInstance(courses, list)

    for course in courses:
        assertInstance(course, dict)

        required_keys = {"description":str,
                         "endDate":str,
                         "id":str,
                         "name":str,
                         "startDate":str
                         }
        verify_keys(required_keys, course)

if __name__ == "__main__":
    pytest.main()
