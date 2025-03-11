import requests
import pytest
import json
from globals import verify_keys

API_CHATBOT = "https://api-deepseek.vercel.app/chatbot"

headers = {
  'Content-Type': 'application/json'
}

def test_chatbot(student_mail):
    input_data = {
        "query": "What is ML?",
        "option": "option",
        "sessionId": "S1234",
        "userEmail": student_mail
    }
    payload = json.dumps(input_data)

    response = requests.post(API_CHATBOT, data=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"sessionId":str, 
                        "question":str, 
                        "answer":str, 
                        "chatHistory": list
                    }
    verify_keys(required_keys, data)

    chathistories = data["chatHistory"]
    for chathistory in chathistories:
        assert isinstance(chathistory, dict), f"Expected response to be a dict, but is {type(chathistory)}"
        
        required_keys = {"query":str, 
                            "answer":str, 
                            "timestamp":str, 
                            "user": dict
                        }
        verify_keys(required_keys, chathistory)

        user = chathistory['user']
        required_keys = {"id":str, 
                            "name":str, 
                            "email":str, 
                            "role": str,
                            "profilePictureUrl": str
                        }
        verify_keys(required_keys, user)

def test_with_incomplete_payload(student_mail,
                                    query_option_required_msg):
    input_data = {
        "option": "option",
        "sessionId": "S1234",
        "userEmail": student_mail
    }
    payload = json.dumps(input_data)

    response = requests.post(API_CHATBOT, data=payload, headers=headers)

    assert response.status_code == 400, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assert data['error'] == query_option_required_msg, f"Expected response to be error: \'{query_option_required_msg}\', but is \'{data['error']}\'"

def test_with_invalid_user(invalid_student_mail,
                           user_not_found_msg):
    input_data = {
        "query": "What is ML?",
        "option": "option",
        "sessionId": "S1234",
        "userEmail": invalid_student_mail
    }
    payload = json.dumps(input_data)

    response = requests.post(API_CHATBOT, data=payload, headers=headers)

    assert response.status_code == 404, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assert data['error'] == user_not_found_msg, f"Expected response to be error: \'{user_not_found_msg}\', but is \'{data['error']}\'"

if __name__ == "__main__":
    pytest.main()
