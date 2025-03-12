# conftest.py
import pytest
import globals

def hello():
    return "hello"

def hi():
    return "hi"

@pytest.fixture
def helpers():
    return {
        "hello": hello,
        "hi": hi
    }  
@pytest.fixture(scope="session", autouse=True)
def setup_globals():
    globals.initialize_globals()

@pytest.fixture
def admin_mail():
    return globals.vars["admin_mail"]

@pytest.fixture
def admin_id():
    return globals.vars["admin_id"]

@pytest.fixture
def admin_name():
    return globals.vars["admin_name"]

@pytest.fixture
def admin_pp():
    return globals.vars["admin_pp"]

@pytest.fixture
def student_mail():
    return globals.vars["student_mail"]

@pytest.fixture
def student_name():
    return globals.vars["student_name"]

@pytest.fixture
def student_id():
    return globals.vars["student_id"]

@pytest.fixture
def student_pp():
    return globals.vars["student_pp"]

@pytest.fixture
def student2_mail():
    return globals.vars["student2_mail"]

@pytest.fixture
def student2_name():
    return globals.vars["student2_name"]

@pytest.fixture
def faculty_mail():
    return globals.vars["faculty_mail"]

@pytest.fixture
def faculty_id():
    return globals.vars["faculty_id"]

@pytest.fixture
def faculty_name():
    return globals.vars["faculty_name"]

@pytest.fixture
def faculty_pp():
    return globals.vars["faculty_pp"]

@pytest.fixture
def course1_id():
    return globals.vars["course1_id"]

@pytest.fixture
def course2_id():
    return globals.vars["course2_id"]

@pytest.fixture
def course2_id():
    return globals.vars["course2_id"]

@pytest.fixture
def invalid_admin_id():
    return globals.vars["invalid_admin_id"]

@pytest.fixture
def invalid_admin_mail():
    return globals.vars["invalid_admin_mail"]

@pytest.fixture
def invalid_student_id():
    return globals.vars["invalid_student_id"]

@pytest.fixture
def invalid_student_mail():
    return globals.vars["invalid_student_mail"]

@pytest.fixture
def invalid_course_id():
    return globals.vars["invalid_course_id"]

@pytest.fixture
def profile_picture():
    return globals.vars["profile_picture"]

@pytest.fixture
def video_url():
    return globals.vars["video_url"]

@pytest.fixture
def invalid_video_url():
    return globals.vars["invalid_video_url"]

@pytest.fixture
def login_success_msg():
    return globals.vars["login_success_msg"]

@pytest.fixture
def email_required_msg():
    return globals.vars["email_required_msg"]

@pytest.fixture
def course_reg_success_msg():
    return globals.vars["course_reg_success_msg"]

@pytest.fixture
def user_del_success_msg():
    return globals.vars["user_del_success_msg"]

@pytest.fixture
def user_not_found_msg():
    return globals.vars["user_not_found_msg"]

@pytest.fixture
def server_error_msg():
    return globals.vars["server_error_msg"]

@pytest.fixture
def invalid_course_msg():
    return globals.vars["invalid_course_msg"]

@pytest.fixture
def reg_bad_request_msg():
    return globals.vars["reg_bad_request_msg"]

@pytest.fixture
def transcript_not_found_msg():
    return globals.vars["transcript_not_found_msg"]

@pytest.fixture
def video_url_required_msg():
    return globals.vars["video_url_required_msg"]

@pytest.fixture
def query_option_required_msg():
    return globals.vars["query_option_required_msg"]