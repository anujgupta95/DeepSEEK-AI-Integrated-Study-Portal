# User API Test Documentation

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
