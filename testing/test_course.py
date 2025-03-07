import requests
import pytest
from globals import verify_keys

API_COURSE = "https://api-deepseek.vercel.app/course/{course_id}"

def test_course_details(course1_id):
    response = requests.get(API_COURSE.format(course_id=course1_id))

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = {"announcements":list, 
                     "courseId":str,
                     "name":str,
                     "description":str,
                     "startDate":str,
                     "endDate":str,
                     "weeks":list
                     }
    verify_keys(required_keys, data)

    announcements = data['announcements']
   
    for announcement in announcements:
        assert isinstance(announcement, dict), f"Expected response to be a dict, but is {type(announcement)}"

        required_keys = {"announcementId":str,
                         "date":str,
                         "message":str
                         }
        verify_keys(required_keys, announcement)

    weeks = data['weeks']
    for week in weeks:
        assert isinstance(week, dict), f"Expected response to be a dict, but is {type(week)}"

        required_keys = {"deadline":str,
                         "modules":list,
                         "title":str,
                         "weekId":str
                         }
        verify_keys(required_keys, week)

        modules = week['modules']
        for module in modules:
            assert isinstance(module, dict), f"Expected response to be a dict, but is {type(module)}"

            required_keys = {"moduleId":str,
                             "title":str,
                             "type":str
                             } #url and questions not present in all modules
            verify_keys(required_keys, module)

            if "questions" in module:
                questions = module['questions']
                assert isinstance(questions, list), f"Expected response to be a list, but is {type(questions)}"
                
                for question in questions:
                    assert isinstance(question, dict), f"Expected response to be a dict, but is {type(question)}"

                    required_keys = {"correctAnswer":str,
                                    #  "hint":str, # Hint can be null sometimes.
                                     "options":list,
                                     "question":str,
                                     "type":str
                                     }
                    verify_keys(required_keys, question)

if __name__ == "__main__":
    pytest.main()
