import requests
import pytest
from globals import verify_keys

API_URL = "https://api-deepseek.vercel.app/video-transcript?videoURL={video_url}"

def test_transcript_video(video_url):
    response = requests.get(API_URL.format(video_url=video_url))
    
    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = {"videoID":str, 
                    "videoURL":str, 
                    "transcript":str, 
                    }
    verify_keys(required_keys, data)

def test_transcript_invalid_video(invalid_video_url,
                                  transcript_not_found_msg):
    response = requests.get(API_URL.format(video_url=invalid_video_url))
    
    assert response.status_code == 404, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assert data['error'] == transcript_not_found_msg, f"Expected response to be error: \'{transcript_not_found_msg}\', but is \'{data['error']}\'"

def test_with_no_parameters(video_url_required_msg):
    response = requests.get(API_URL.format(video_url=''))
    
    assert response.status_code == 400, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"

    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assert data['error'] == video_url_required_msg, f"Expected response to be error: \'{video_url_required_msg}\', but is \'{data['error']}\'"

if __name__ == "__main__":
    pytest.main()
