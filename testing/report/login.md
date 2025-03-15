# Login

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
