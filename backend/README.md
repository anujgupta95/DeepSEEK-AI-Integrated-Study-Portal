# 🌟 Deepseek - Seek Portal AI Agent (Backend) 🌟

Welcome to the **Deepseek - Seek Portal AI Agent** frontend repository! 🚀 

📌 **Live Demo:** [Deepseek Portal API](https://api.deepseek.anujg.me)  

---

## 🛠️ **Tech Stack**  

| **Category**  | **Technology Used**  |
|--------------|------------------|
| **Backend Framework** | Flask (REST API) |
| **Database** | MongoDB (with PyMongo & MongoEngine) |
| **Deployment** | Vercel |
| **APIs** | YouTube Transcript API, GROQ AI API |

---

## 🚀 **Getting Started**  

### 🔹 **1. Clone the Repository**  
```sh
git clone https://github.com/21f3002975/seek-portal-ai-agent.git
cd seek-portal-ai-agent/backend
```

### 🔹 **2. Set Up a Virtual Environment**  
```sh
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 🔹 **3. Set Up Environment Variables**  
Create a `.env` file in the root directory and configure:  
```env
MONGO_URI=
RAG_API=
GROQ_API_KEY=
```
Replace with your actual credentials.

### 🔹 **4. Run the Backend Server**  
```sh
python -m api.app
```
📌 Your API will now be live at **`http://localhost:5000/`**.

---

## 📦 **Dependencies**  

The backend uses the following Python libraries:  
```plaintext
Flask==3.0.0
Flask-Cors==4.0.0
Flask-RESTful==0.3.10
Flask-Bcrypt==1.0.1
Flask-JWT-Extended==4.5.3
Flask-PyMongo==2.3.0
mongoengine==0.27.0
pymongo==4.6.1
gunicorn==21.2.0
youtube_transcript_api
python-dotenv==1.0.1
requests
```

---

## 👥 Contributors  
- [Ajay Thiagarajan](https://github.com/AjayIITM-Projects) 🚀  
---

## ❓ **Need Help?**  
Feel free to contribute or reach out if you have any questions! 😊  
Happy coding! 💻✨
