vars = {}

def initialize_globals():
    global vars

    vars["API_LOGIN"] = "https://api-deepseek.vercel.app/login"
    vars["admin_mail"] = "admin@example.com"
    vars["admin_name"] = "Admin User"
    vars["admin_id"] = "67cb08d7982acf59d0895dd7"
    vars["admin_pp"] = "DP:)"
    vars["student_id"] = "67cb08d7982acf59d0895dd8"
    vars["student_name"] = "Student User"
    vars["student_mail"] = "student@example.com"
    vars["student_pp"] = "DP:)"
    vars["student2_mail"] = "21f1001185@ds.study.iitm.ac.in"
    vars["student2_name"] = "Anand Iyer"
    vars["faculty_mail"] = "faculty@example.com"
    vars["faculty_name"] = "Faculty User"
    vars["faculty_id"] = "67cb08d7982acf59d0895dd9"
    vars["faculty_pp"] = "DP:)"
    vars["course1_id"] = "67cb08d7982acf59d0895dda"
    vars["course2_id"] = "67cb08d7982acf59d0895ddb"
    vars["invalid_admin_mail"] = "invalid_admin@example.com"
    vars["invalid_student_mail"] = "invalid_student@example.com"
    vars["invalid_admin_id"] = "1234567890"
    vars["invalid_student_id"] = "1234567890"
    vars["invalid_course_id"] = "1234567890"
    vars["profile_picture"] = "https://example.com/profile.jpg"
    vars["video_url"] = "https://www.youtube.com/embed/PBnhRTf00Z0"
    vars["invalid_video_url"] = "https://youtu.be/tSxaHyukmIU"
    vars["login_success_msg"] = "Login successful"
    vars["email_required_msg"] = "Email is required"
    vars["course_reg_success_msg"] = "User updated with new courses"
    vars["user_del_success_msg"] = "User deleted successfully"
    vars["user_not_found_msg"] = "User not found"
    vars["server_error_msg"] = "Internal Server Error"
    vars["invalid_course_msg"] = "Invalid course ID"
    vars["reg_bad_request_msg"] = "Email and courses are required"
    vars["transcript_not_found_msg"] = "Transcript not found for the given video URL"
    vars["video_url_required_msg"] = "videoURL is required"
    vars["query_option_required_msg"] = "Query and option are required"

def verify_keys(required_keys, data):
    assert set(required_keys.keys()).issubset(set(data.keys())), f"Expected response to have following keys: {required_keys.keys()}, but found the following keys: {list(data.keys())}"
    for key in required_keys:
        assert required_keys[key] == type(data[key]), f"Expected type of {key} to be {required_keys[key]}({key}), but is {type(data[key])}"

def assertEquals(actual, expected):
    assert actual == expected, f"Expected \'{expected}\', but is \'{actual}\'"

def assertInstance(actual, expected):
    assert isinstance(actual, expected), f"Expected \'{expected}\', but is \'{type(actual)}\'"

def assertTrue(condition, message):
    assert condition, message
