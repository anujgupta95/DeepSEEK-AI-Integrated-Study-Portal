import requests
import pytest
from globals import verify_keys, assertEquals, assertInstance

API_COURSE = "https://api-deepseek.vercel.app/course/{course_id}"

def test_course_details(course1_id):
    response = requests.get(API_COURSE.format(course_id=course1_id))

    assertEquals(response.status_code, 200)
    
    assertEquals(response.headers["Content-Type"], "application/json")

    data = response.json()
    
    assertInstance(data, dict)
    
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
        assertInstance(announcement, dict)

        required_keys = {"announcementId":str,
                         "date":str,
                         "message":str
                         }
        verify_keys(required_keys, announcement)

    weeks = data['weeks']
    for week in weeks:
        assertInstance(week, dict)

        required_keys = {"deadline":str,
                         "modules":list,
                         "title":str,
                         "weekId":str
                         }
        verify_keys(required_keys, week)

        modules = week['modules']
        for module in modules:
            assertInstance(module, dict)

            required_keys = {"moduleId":str,
                             "title":str,
                             "type":str
                             } #url and questions not present in all modules
            verify_keys(required_keys, module)

            if "questions" in module:
                questions = module['questions']
                assertInstance(questions, list)
                
                for question in questions:
                    assertInstance(question, dict)

                    required_keys = {"correctAnswer":str,
                                    #  "hint":str, # Hint can be null sometimes.
                                     "options":list,
                                     "question":str,
                                     "type":str
                                     }
                    verify_keys(required_keys, question)

if __name__ == "__main__":
    pytest.main()
