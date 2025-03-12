# PyTest cases for Software Engineering Project - AI Agent for SEEK

## Here's the list of all tests in this test suite (grouped by test_file_name):

### test_admin_statistics

- test_admin_statistics

### test_chatbot.py

- test_1_chatbot
- test_2_incomplete_payload
- test_3_invalid_user

### test_course.py

- test_course_details

### test_courses.py

- test_list_courses

### test_db_status

- test_db_status

### test_login.py

- test_1_student_login
- test_2_admin_login
- test_3_faculty_login
- test_4_email_required

### test_register_courses.py

- test_1_register_course
- test_2_list_registered_courses
- test_3_identify_user
- test_4_user_delete
- test_5_create_user
- test_6_register_two_courses
- test_7_list_registered_courses
- test_8_register_invalid_course
- test_9_list_registered_courses_without_email
- test_10_list_registered_courses_invalid_user
- test_11_register_courses_empty_payload

### test_user_statistics.py

- test_1_login
- test_2_user_statistics
- test_3_user_delete
- test_4_user_statistics_user_not_found

### test_user.py

- test_1_login
- test_2_user_details
- test_3_user_delete
- test_4_user_delete_user_not_found
- test_5_user_details_user_not_found

### test_users.py

- test_list_users

### test_video_transcript

- test_1_transcript_video
- test_2_transcript_invalid_video
- test_3_no_parameters

## How to run tests?

- Open terminal
- cd testing
- pytest

## How to run individual test files?

- pytest <test_file_name>

## How to run individual tests?

- pytest <test_file_name>::<test_name>