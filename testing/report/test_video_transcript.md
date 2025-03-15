# Video Transcript API Test Documentation

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
