# Courses API Test Documentation

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
