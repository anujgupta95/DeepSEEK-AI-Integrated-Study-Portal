import requests
import pytest
from globals import verify_keys, assertEquals, assertInstance

API_URL = "https://api-deepseek.vercel.app/admin-statistics"

def test_admin_statistics():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"totalUsers":int,
                        "totalModules":int,
                        "activeUsers":int,
                        "questionsAttempted":int
                    }
    verify_keys(required_keys, data)

if __name__ == "__main__":
    pytest.main()
