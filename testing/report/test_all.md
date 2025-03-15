# Database Status
### Description: Get DB connection status.

## Test 1: Check Database Status

**API URL:** `https://api-deepseek.vercel.app/db_status`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `status` : `bool`

### Actual Keys and Data Types in Response:
- `status` : `bool`

---

# Login
### Description: Allows users to log in with their Google account.

## Test 1: Student Login

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "student_mail",
    "name": "student_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `message` : `str`
- `picture` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `message` : `str`
- `picture` : `str`

---

## Test 2: Admin Login

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "admin_mail",
    "name": "admin_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `message` : `str`
- `picture` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `message` : `str`
- `picture` : `str`

---

## Test 3: Faculty Login

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "faculty_mail",
    "name": "faculty_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `message` : `str`
- `picture` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `message` : `str`
- `picture` : `str`

---

## Test 4: Email Required

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "faculty_mail",
    "name": "faculty_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`400`

### Actual Status Code:
`400`

### Expected Error Message:
`Email is required`

### Actual Error Message:
`Email is required`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

# Course Details
### Description: Fetch detailed information about a specific course using its ID.

## Test 1: Fetch Course Details

**API URL:** `https://api-deepseek.vercel.app/course/{course_id}`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `announcements` : `list`
- `courseId` : `str`
- `name` : `str`
- `description` : `str`
- `startDate` : `str`
- `endDate` : `str`
- `weeks` : `list`

### Actual Keys and Data Types in Response:
- `announcements` : `list`
- `courseId` : `str`
- `name` : `str`
- `description` : `str`
- `startDate` : `str`
- `endDate` : `str`
- `weeks` : `list`

## Additional Data Verification

### Announcements Structure:

Each item in the `announcements` list must contain:
- `announcementId` : `str`
- `date` : `str`
- `message` : `str`

### Weeks Structure:

Each item in the `weeks` list must contain:
- `deadline` : `str`
- `modules` : `list`
- `title` : `str`
- `weekId` : `str`

### Modules Structure:

Each item in the `modules` list must contain:
- `moduleId` : `str`
- `title` : `str`
- `type` : `str`

Optional field (only present in some modules):
- `questions` : `list`

### Questions Structure:

If `questions` key is present in a module, each item in the `questions` list must contain:
- `correctAnswer` : `str`
- `options` : `list`
- `question` : `str`
- `type` : `str`

---

# Courses
### Description: Retrieve a list of all available courses.

## Test 1: List All Courses

**API URL:** `https://api-deepseek.vercel.app/courses`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `courses` : `list`

### Actual Keys and Data Types in Response:
- `courses` : `list`

## Additional Data Verification

### Course Structure:

Each item in the `courses` list must contain:
- `id` : `str`
- `name` : `str`
- `description` : `str`
- `startDate` : `str`
- `endDate` : `str`

---

# Register Courses
### Description: 

## Test 1: Register Course

**API URL:** `https://api-deepseek.vercel.app/registered-courses`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "student_mail",
    "courses": ["course1_id"]
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Message:
`User updated with new courses`

### Actual Message:
`User updated with new courses`

### Expected Keys and Data Types in Response:
- `message` : `str`
- `user_id` : `str`

### Actual Keys and Data Types in Response:
- `message` : `str`
- `user_id` : `str`

## Test 2: List Registered Courses

**API URL:** `https://api-deepseek.vercel.app/registered-courses?email={email}`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `registeredCourses` : `list`

### Actual Keys and Data Types in Response:
- `registeredCourses` : `list`

## Test 3: Identify User

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "student2_mail",
    "name": "student2_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`

## Test 4: Delete User

**API URL:** `https://api-deepseek.vercel.app/user/{user_id}`  
**API Method:** `DELETE`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Message:
`User deleted successfully`

### Actual Message:
`User deleted successfully`

### Expected Keys and Data Types in Response:
- `message` : `str`

### Actual Keys and Data Types in Response:
- `message` : `str`

## Test 5: Create User

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`

## Test 6: Register Two Courses

**API URL:** `https://api-deepseek.vercel.app/registered-courses`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "student2_mail",
    "courses": ["course1_id", "course2_id"]
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Message:
`User updated with new courses`

### Actual Message:
`User updated with new courses`

### Expected Keys and Data Types in Response:
- `message` : `str`
- `user_id` : `str`

### Actual Keys and Data Types in Response:
- `message` : `str`
- `user_id` : `str`

## Test 7: List Registered Courses for Two Courses

**API URL:** `https://api-deepseek.vercel.app/registered-courses?email={email}`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `registeredCourses` : `list`

### Actual Keys and Data Types in Response:
- `registeredCourses` : `list`

## Test 8: Register Invalid Course

**API URL:** `https://api-deepseek.vercel.app/registered-courses`  
**API Method:** `POST`  

### Expected Status Code:
`400`

### Actual Status Code:
`400`

### Expected Error Message:
`Invalid course ID`

### Actual Error Message:
`Invalid course ID`

### Expected Keys and Data Types in Response:
- `details` : `str`
- `error` : `str`

### Actual Keys and Data Types in Response:
- `details` : `str`
- `error` : `str`

## Test 9: List Registered Courses Without Email

**API URL:** `https://api-deepseek.vercel.app/registered-courses?email=`  
**API Method:** `GET`  

### Expected Status Code:
`400`

### Actual Status Code:
`400`

### Expected Error Message:
`Email is required`

### Actual Error Message:
`Email is required`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

## Test 10: List Registered Courses for Invalid User

**API URL:** `https://api-deepseek.vercel.app/registered-courses?email={invalid_student_mail}`  
**API Method:** `GET`  

### Expected Status Code:
`404`

### Actual Status Code:
`404`

### Expected Error Message:
`User not found`

### Actual Error Message:
`User not found`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

## Test 11: Register Courses with Empty Payload

**API URL:** `https://api-deepseek.vercel.app/registered-courses`  
**API Method:** `POST`  

### Expected Status Code:
`400`

### Actual Status Code:
`400`

### Expected Error Message:
`Email and courses are required`

### Actual Error Message:
`Email and courses are required`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

# Users
### Description: Retrieve a list of all registered users in the system.

## Test 1: List All Users

**API URL:** `https://api-deepseek.vercel.app/users`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `profilePictureUrl` : `str`
- `registeredCourses` : `list`

### Actual Keys and Data Types in Response:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `profilePictureUrl` : `str`
- `registeredCourses` : `list`

---

# User
### Description: Fetch detailed information about a specific user by their ID

## Test 1: User Login

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "student2_mail",
    "name": "student2_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`

---

## Test 2: Fetch User Details

**API URL:** `https://api-deepseek.vercel.app/user/{user_id}`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `profilePictureUrl` : `str`
- `registeredCourses` : `list`
- `role` : `str`

### Actual Keys and Data Types in Response:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `profilePictureUrl` : `str`
- `registeredCourses` : `list`
- `role` : `str`

---

## Test 3: Delete User

**API URL:** `https://api-deepseek.vercel.app/user/{user_id}`  
**API Method:** `DELETE`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Message:
`User deleted successfully`

### Actual Message:
`User deleted successfully`

### Expected Keys and Data Types in Response:
- `message` : `str`

### Actual Keys and Data Types in Response:
- `message` : `str`

---

## Test 4: Delete Non-Existent User

**API URL:** `https://api-deepseek.vercel.app/user/{user_id}`  
**API Method:** `DELETE`  

### Expected Status Code:
`404`

### Actual Status Code:
`404`

### Expected Error Message:
`User not found`

### Actual Error Message:
`User not found`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

## Test 5: Fetch Non-Existent User Details

**API URL:** `https://api-deepseek.vercel.app/user/{user_id}`  
**API Method:** `GET`  

### Expected Status Code:
`404`

### Actual Status Code:
`404`

### Expected Error Message:
`User not found`

### Actual Error Message:
`User not found`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

# User Statistics
### Description: Retrieve statistics for a specific user.

## Test 1: User Login

**API URL:** `https://api-deepseek.vercel.app/login`  
**API Method:** `POST`  

### Input Data:
```json
{
    "email": "student2_mail",
    "name": "student2_name",
    "picture": "profile_picture"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `userId` : `str`

### Actual Keys and Data Types in Response:
- `userId` : `str`

---

## Test 2: Fetch User Statistics

**API URL:** `https://api-deepseek.vercel.app/user-statistics/{user_id}`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `statistics` : `dict`
- `registeredCourses` : `list`
- `role` : `str`

### Actual Keys and Data Types in Response:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `statistics` : `dict`
- `registeredCourses` : `list`
- `role` : `str`

## Additional Data Verification

### Statistics Structure:

Each `statistics` object must contain:
- `averageScore` : `int`
- `modulesCompleted` : `int`
- `questionsAttempted` : `int`

---

## Test 3: Delete User

**API URL:** `https://api-deepseek.vercel.app/user/{user_id}`  
**API Method:** `DELETE`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Message:
`User deleted successfully`

### Actual Message:
`User deleted successfully`

### Expected Keys and Data Types in Response:
- `message` : `str`

### Actual Keys and Data Types in Response:
- `message` : `str`

---

## Test 4: Fetch Statistics for Non-Existent User

**API URL:** `https://api-deepseek.vercel.app/user-statistics/{user_id}`  
**API Method:** `GET`  

### Expected Status Code:
`404`

### Actual Status Code:
`404`

### Expected Error Message:
`Internal Server Error`

### Actual Error Message:
`Internal Server Error`

### Expected Keys and Data Types in Response:
- `message` : `str`

### Actual Keys and Data Types in Response:
- `message` : `str`

---

# Video Transcript
### Description: Retrieve a transcript for a lecture video on Youtube using its URL.

## Test 1: Fetch Video Transcript

**API URL:** `https://api-deepseek.vercel.app/video-transcript?videoURL={video_url}`  
**API Method:** `GET`  

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `videoID` : `str`
- `videoURL` : `str`
- `transcript` : `str`

### Actual Keys and Data Types in Response:
- `videoID` : `str`
- `videoURL` : `str`
- `transcript` : `str`

---

## Test 2: Fetch Transcript for Invalid Video

**API URL:** `https://api-deepseek.vercel.app/video-transcript?videoURL={invalid_video_url}`  
**API Method:** `GET`  

### Expected Status Code:
`404`

### Actual Status Code:
`404`

### Expected Error Message:
`Transcript not found for the given video URL`

### Actual Error Message:
`Transcript not found for the given video URL`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

## Test 3: Fetch Transcript Without Video URL

**API URL:** `https://api-deepseek.vercel.app/video-transcript?videoURL=`  
**API Method:** `GET`  

### Expected Status Code:
`400`

### Actual Status Code:
`400`

### Expected Error Message:
`videoURL is required`

### Actual Error Message:
`videoURL is required`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

# Chatbot
### Description: Allows users to interact with the chatbot by submitting queries and receiving responses.

## Test 1: Chatbot Interaction

**API URL:** `https://api-deepseek.vercel.app/chatbot`  
**API Method:** `POST`  

### Input Data:
```json
{
    "query": "What is ML?",
    "option": "option",
    "sessionId": "S1234",
    "userEmail": "student_mail"
}
```

### Expected Status Code:
`200`

### Actual Status Code:
`200`

### Expected Keys and Data Types in Response:
- `sessionId` : `str`
- `question` : `str`
- `answer` : `str`
- `chatHistory` : `list`

### Actual Keys and Data Types in Response:
- `sessionId` : `str`
- `question` : `str`
- `answer` : `str`
- `chatHistory` : `list`

## Additional Data Verification

### Chat History Structure:

Each item in the `chatHistory` list must contain:
- `query` : `str`
- `answer` : `str`
- `timestamp` : `str`
- `user` : `dict`

### User Structure:

Each `user` object in the `chatHistory` must contain:
- `id` : `str`
- `name` : `str`
- `email` : `str`
- `role` : `str`
- `profilePictureUrl` : `str`

---

## Test 2: Incomplete Payload

**API URL:** `https://api-deepseek.vercel.app/chatbot`  
**API Method:** `POST`  

### Input Data:
```json
{
    "option": "option",
    "sessionId": "S1234",
    "userEmail": "student_mail"
}
```

### Expected Status Code:
`400`

### Actual Status Code:
`400`

### Expected Error Message:
`Query and option are required`

### Actual Error Message:
`Query and option are required`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---

## Test 3: Invalid User

**API URL:** `https://api-deepseek.vercel.app/chatbot`  
**API Method:** `POST`  

### Input Data:
```json
{
    "query": "What is ML?",
    "option": "option",
    "sessionId": "S1234",
    "userEmail": "invalid_student_mail"
}
```

### Expected Status Code:
`404`

### Actual Status Code:
`404`

### Expected Error Message:
`User not found`

### Actual Error Message:
`User not found`

### Expected Keys and Data Types in Response:
- `error` : `str`

### Actual Keys and Data Types in Response:
- `error` : `str`

---
# Admin Statistics
### Description: Retrieve statistics for administrative purposes, including user and system data management.

## Test 1: Admin Statistics

**API URL:** `https://api-deepseek.vercel.app/admin-statistics`  
**API Method:** `GET`  

### Expected Status Code:

`200`

### Actual Status Code:

`200`

### Expected Keys and Data Types in Response:

- `totalUsers` : `int`
- `totalModules` : `int`
- `activeUsers` : `int`
- `questionsAttempted` : `int`

### Actual Keys and Data Types in Response:

- `totalUsers` : `int`
- `totalModules` : `int`
- `activeUsers` : `int`
- `questionsAttempted` : `int`

---