import requests
import pytest
from globals import verify_keys, assertEquals, assertInstance

API_URL = "https://api-deepseek.vercel.app/db_status"

def test_db_status():
    response = requests.get(API_URL)
    print(response.headers["Content-Type"])

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
    required_keys = {"status":bool}
    verify_keys(required_keys, data)

if __name__ == "__main__":
    pytest.main()
