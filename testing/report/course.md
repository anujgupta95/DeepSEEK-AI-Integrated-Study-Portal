# Course Details

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
