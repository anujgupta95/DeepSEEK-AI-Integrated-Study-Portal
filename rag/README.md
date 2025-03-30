---

# 🚀 Deepseek - Seek Portal AI Agent (RAG & AI)

A **Retrieval-Augmented Generation (RAG) system** built with **FastAPI** and **LangChain** to provide intelligent responses based on course content from PDF documents.  

---

## 🌍 Live Demo  
🔗 [Access the application here](https://rag.deepseek.anujg.me/)  

You can either use the above link to access the portal or follow the steps below to run it locally.

---

## 🌟 Features  

✅ **RAG System** – Context-aware responses using **FAISS** vector store  
✅ **Multiple Learning Modes**:  
   - 📝 **Graded Questions** – Hints only  
   - 🎯 **Practice Mode** – Guided hints  
   - 📖 **Learning Mode** – Detailed explanations  
✅ **🛠️ Code Debugging** – Python code analysis endpoint  
✅ **📂 PDF Management** – Persistent vector storage of course materials  
✅ **💬 Conversation History** – Multi-turn interactions with context  

---

## 📌 Prerequisites  

Ensure you have the following installed:  

- **Python 3.7+**  
- **[Groq API Key](https://console.groq.com/)**  
- **[Google API Key](https://cloud.google.com/)**  
- **Course PDFs** stored in `./pdf_files`  

---

## ⚡ Installation  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/21f3002975/seek-portal-ai-agent.git
cd seek-portal-ai-agent/rag
```

### 2️⃣ Set Up Virtual Environment  

```bash
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate  # Windows
```

### 3️⃣ Install Dependencies  

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Environment Variables  

Create a `.env` file and add:  

```env
GROQ_API_KEY=your_groq_api_key
GOOGLE_API_KEY=your_google_api_key
```

---

## 🚀 Usage  

### 1️⃣ Start the Server  

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 2️⃣ Available API Endpoints  

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/ask` | **POST** | Query endpoint with **graded**, **practice**, or **learning** mode |
| `/debug/code` | **POST** | Python code debugging assistance |
| `/top-questions` | **POST** | Analyze question patterns |
| `/pdfs` | **GET** | List indexed PDFs |

---

## 📖 API Reference  

### 🔹 **POST /ask**  
💡 **Request:**  

```json
{
  "query": "What is merge sort?",
  "history": [],
  "prompt_option": "learning"
}
```

💡 **Response:**  

```json
{
  "response": "Formatted answer with resources...",
  "updated_history": []
}
```

---

### 🔹 **POST /debug/code**  
💡 **Request:**  

```json
{
  "question": "What’s wrong with this code?",
  "code": "def example(): pass"
}
```

---

### 🔹 **GET /pdfs**  
💡 **Response:**  

```json
{
  "pdfs": ["machine-learning.pdf", "algorithms.pdf"]
}
```

---

## ⚙️ Configuration  

### 🔹 Environment Variables  

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq Cloud API key |
| `GOOGLE_API_KEY` | Google Generative AI credentials |

### 🔹 PDF Storage  

- Place all PDFs in the `./pdf_files` directory  
- FAISS vector store automatically **builds on first run**  

---

## 🚢 Deployment  

### 🔹 **Run on Production**  

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```
---

## 👥 Contributors  
- [Jalaj Trivedi](https://github.com/jt232003) 🚀  
- [Niraj Kumar](https://github.com/nirajkumar1002) 🚀  
