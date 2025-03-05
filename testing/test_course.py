import requests
import pytest

API_URL = "https://api-deepseek.vercel.app/course/67c7fbef6675cfd49013bfca"

def test_list_courses():
    response = requests.get(API_URL)

    assert response.status_code == 200, f"Expected status code 200, but is {response.status_code}"
    
    assert response.headers["Content-Type"] == "application/json", f"Expected Content-Type application/json, but is {response.headers['Content-Type']}"

    data = response.json()
    
    assert isinstance(data, dict), f"Expected response to be a dict, but is {type(data)}"
    
    required_keys = ["announcements", "courseId", "name", "description", "startDate", "endDate", "weeks"]
    assert set(required_keys) == set(data.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(data.keys())}"

    announcements = data['announcements']
    assert isinstance(announcements, list), f"Expected response to be a list, but is {type(announcements)}"
    
    for announcement in announcements:
        assert isinstance(announcement, dict), f"Expected response to be a dict, but is {type(announcement)}"

        required_keys = ["announcementId", "date", "message"]
        assert set(required_keys) == set(announcement.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(announcement.keys())}"

    weeks = data['weeks']
    assert isinstance(weeks, list), f"Expected response to be a list, but is {type(weeks)}"
    
    for week in weeks:
        assert isinstance(week, dict), f"Expected response to be a dict, but is {type(week)}"

        required_keys = ["deadline", "modules", "title", "weekId"]
        assert set(required_keys) == set(week.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(week.keys())}"

        modules = week['modules']
        assert isinstance(modules, list), f"Expected response to be a list, but is {type(modules)}"
        
        for module in modules:
            assert isinstance(module, dict), f"Expected response to be a dict, but is {type(module)}"

            required_keys = ["moduleId", "title", "type"] #url and questions not present in all modules
            assert set(required_keys).issubset(set(module.keys())), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(module.keys())}"

            if "questions" in module:
                questions = module['questions']
                assert isinstance(questions, list), f"Expected response to be a list, but is {type(questions)}"
                
                for question in questions:
                    assert isinstance(question, dict), f"Expected response to be a dict, but is {type(question)}"

                    required_keys = ["correctAnswer", "hint", "options", "question", "type"]
                    assert set(required_keys) == set(question.keys()), f"Expected response to have following keys: {required_keys}, but found the following keys: {list(question.keys())}"

                    options = question['options']
                    assert isinstance(options, list), f"Expected response to be a list, but is {type(options)}"                

if __name__ == "__main__":
    pytest.main()
