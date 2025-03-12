import requests
import pytest
from globals import verify_keys, assertEquals, assertInstance

API_URL = "https://api-deepseek.vercel.app/video-transcript?videoURL={video_url}"

def test_1_transcript_video(video_url):
    response = requests.get(API_URL.format(video_url=video_url))
    
    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)

    required_keys = {"videoID":str, 
                    "videoURL":str, 
                    "transcript":str, 
                    }
    verify_keys(required_keys, data)

def test_2_transcript_invalid_video(invalid_video_url,
                                  transcript_not_found_msg):
    response = requests.get(API_URL.format(video_url=invalid_video_url))
    
    assertEquals(response.status_code, 404)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)

    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assertEquals(data['error'], transcript_not_found_msg)

def test_3_no_parameters(video_url_required_msg):
    response = requests.get(API_URL.format(video_url=''))
    
    assertEquals(response.status_code, 400)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)

    required_keys = {"error":str}
    verify_keys(required_keys, data)

    assertEquals(data['error'], video_url_required_msg)

if __name__ == "__main__":
    pytest.main()
