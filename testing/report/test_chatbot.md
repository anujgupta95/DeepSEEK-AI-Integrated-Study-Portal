# Chatbot API Test Documentation

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
