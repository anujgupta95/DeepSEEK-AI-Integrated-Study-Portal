# Register Courses

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
