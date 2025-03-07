vars = {
    "API_LOGIN":None,
    "admin_mail":None,
    "admin_name":None,
    "admin_id":None,
    "student_mail":None,
    "student_name":None,
    "student_id":None,
    "student2_mail":None,
    "student2_name":None,
    "course1_id":None,
    "course2_id":None,
    "invalid_admin_mail":None,
    "invalid_student_id":None,
    "invalid_course_id":None,
    "profile_picture":None,
    "login_success_msg": None,
    "course_reg_success_msg": None,
    "user_del_success_msg": None,
    "user_not_found_msg": None,
    "server_error_msg": None,
    "invalid_course_msg": None,
    "email_required_msg": None
}

def initialize_globals():
    global vars

    vars["API_LOGIN"] = "https://api-deepseek.vercel.app/login"
    vars["admin_mail"] = "admin@example.com"
    vars["admin_name"] = "Admin User"
    vars["admin_id"] = "67c7fbef6675cfd49013bfc7"
    vars["student_id"] = "67c9ae1562765222f162cd9a"
    vars["student_name"] = "student@example.com"
    vars["student_mail"] = "student@example.com"
    vars["student2_mail"] = "21f1001185@ds.study.iitm.ac.in"
    vars["student2_name"] = "Anand Iyer"
    vars["faculty_mail"] = "faculty@example.com"
    vars["faculty_name"] = "Faculty User"
    vars["faculty_id"] = "67c7fbef6675cfd49013bfc7"
    vars["course1_id"] = "67c7fbef6675cfd49013bfca"
    vars["course2_id"] = "67c7fbef6675cfd49013bfcb"
    vars["invalid_admin_mail"] = "invalid_admin@example.com"
    vars["invalid_student_mail"] = "invalid_student@example.com"
    vars["invalid_admin_id"] = "1234567890"
    vars["invalid_student_id"] = "1234567890"
    vars["invalid_course_id"] = "1234567890"
    vars["profile_picture"] = "https://example.com/profile.jpg"
    vars["login_success_msg"] = "Login successful"
    vars["email_required_msg"] = "Email is required"
    vars["course_reg_success_msg"] = "User updated with new courses"
    vars["user_del_success_msg"] = "User deleted successfully"
    vars["user_not_found_msg"] = "User not found"
    vars["server_error_msg"] = "Internal Server Error"
    vars["invalid_course_msg"] = "Invalid course ID"
