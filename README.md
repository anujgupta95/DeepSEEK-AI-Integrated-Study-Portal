# 🌟 Deepseek - Seek Portal AI Agent 🌟  

Welcome to **Deepseek - Seek Portal AI Agent**, a powerful AI-driven system that combines **Retrieval-Augmented Generation (RAG)**, **AI-powered interactions**, and a **seamless frontend experience**. 🚀  

📌 **Live Demo:**  
🔗 [Frontend Portal](https://deepseek.anujg.me/)  
🔗 [Backend API](https://api.deepseek.anujg.me)  
🔗 [RAG API](https://rag.deepseek.anujg.me)  

---

## 🛠️ Tech Stack  

| **Category** | **Technology Used** |
|-------------|------------------|
| **Frontend** | React, Vite, TailwindCSS, ShadCN, React Router, Google OAuth |
| **Backend** | Flask (REST API), MongoDB (PyMongo & MongoEngine), Vercel |
| **RAG & AI** | FastAPI, LangChain, FAISS, Python, Render |
| **APIs** | YouTube Transcript API, Groq AI API, Google API |
| **Deployment** | Vercel, Render, Gunicorn, Uvicorn |

---

# 🚀 Getting Started  

## 🔹 1️⃣ Clone the Repository  

```sh
git clone https://github.com/21f3002975/seek-portal-ai-agent.git
cd seek-portal-ai-agent
```

---

# 🔥 Backend Setup (Flask)  

### 2️⃣ Set Up a Virtual Environment  

```sh
cd backend
python3 -m venv venv
source venv/bin/activate  # MacOS/Linux
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 3️⃣ Configure Environment Variables  

Create a `.env` file and add:  

```env
MONGO_URI=
RAG_API=
GROQ_API_KEY=
```

### 4️⃣ Run the Backend Server  

```sh
python -m api.app
```

📌 **API is live at:** `http://localhost:5000/`

---

# ⚡ Frontend Setup (React + Vite)  

### 2️⃣ Install Dependencies  

```sh
cd frontend
npm install
```

### 3️⃣ Configure Environment Variables  

Create a `.env` file in the root directory and add:  

```env
VITE_API_URL=
VITE_GOOGLE_CLIENT_ID=
```

### 4️⃣ Start the Frontend Server  

```sh
npm run dev
```

📌 **App is live at:** `http://localhost:3000/`

---

# 🤖 RAG & AI Setup (FastAPI + LangChain)  

### 2️⃣ Set Up Virtual Environment  

```sh
cd rag
python -m venv venv
source venv/bin/activate  # MacOS/Linux
venv\Scripts\activate  # Windows
```

### 3️⃣ Install Dependencies  

```sh
pip install -r requirements.txt
```

### 4️⃣ Configure Environment Variables  

Create a `.env` file and add:  

```env
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key
```

### 5️⃣ Run the RAG & AI Server  

```sh
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

📌 **API is live at:** `http://localhost:8000/`

---

# 👥 Contributors  

  - [AJR Vasu](https://github.com/21f3002975) 🚀  
  - [Ajay Thiagarajan](https://github.com/AjayIITM-Projects) 🚀  
  - [Anand K Iyer](https://github.com/21f1001185) 🚀  
  - [Anuj Gupta](https://github.com/anujgupta95) 🚀  
  - [Jalaj Trivedi](https://github.com/jt232003) 🚀  
  - [Niraj Kumar](https://github.com/nirajkumar1002) 🚀  
  - [Ghanashyamn R](https://github.com/ghanashyam-r) 🚀  

---

# 🌟 **"Alone we can do so little; together we can do so much. Our team is not just a group of individuals, but a synergy of talents, passions, and dedication that propels us towards greatness."** 🌟

🚀 **Happy coding!** 💻✨
