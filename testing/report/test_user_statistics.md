# User Statistics API Test Documentation

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
