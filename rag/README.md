# DeepSEEK Portal

DeepSEEK Portal is a Retrieval-Augmented Generation (RAG) application built using Streamlit and LangChain. It processes PDF documents to build a persistent FAISS vector store, retrieves relevant document context for user queries, and supports summarizing conversation history. Both the vector store and chat history are maintained locally on disk for persistence between sessions.

## Features

- **Persistent FAISS Vector Store:**  
  The application builds a FAISS index from PDF files stored in the `pdf_files` folder and saves it locally (in the `faiss_index` directory). This avoids costly re-indexing on every startup.

- **Document-Based Retrieval:**  
  For each user query, the app retrieves relevant context from the vector store and generates an answer using the ChatGroq language model.

- **Persistent Chat History:**  
  All query-response pairs are saved to a local JSON file (`chat_history.json`). This allows the system to recall and summarize previous chat interactions.

- **Summarization:**  
  If a user request contains the word "summarize", the application retrieves the entire conversation history and produces a concise, bullet-point summary.

- **Modular and Secure:**  
  The code uses local files for persistent storage and ensures secure deserialization by requiring the user to set `allow_dangerous_deserialization=True` (only recommended for trusted data).

## Prerequisites

- **Python 3.7+**
- **Streamlit**  
- **LangChain and LangChain Community Modules**  
- **faiss-cpu** (or `faiss-gpu` if using GPU)  
- **Dotenv**  
- **Other dependencies as specified in `requirements.txt`**

## Installation

1. **Clone the Repository:**


2. **Using the App:**
3. 'Jalaj and Anuj is boss'

- **Normal Query:**  
  Enter your question or query in the text input field. The system retrieves relevant document context from the pre-built FAISS index and generates an answer.

- **Summarization Request:**  
  If you type a query containing the word "summarize" (e.g., "Summarize my last 10 chats"), the app will load the persistent chat history from `chat_history.json` and display a bullet-point summary of your conversation.

- **Detailed Similarity Info:**  
  Expand the "Document Similarity Search Details" section to view information (PDF name, page/slide number, and content) for each document chunk retrieved.

## Architecture Overview

- **FAISS Vector Store:**  
- Built from PDFs using LangChain components.
- Saved in the `faiss_index` directory for persistent storage and fast reloads.

- **Chat History:**  
- Stored in a local JSON file (`chat_history.json`), updated after every interaction.

- **Retrieval and Generation Pipeline:**  
- Uses retrieval-augmented generation (RAG) to combine document context with language model outputs, producing answers that are both contextually aware and conversational.

## Security Considerations

- **Deserialization Warning:**  
Using `allow_dangerous_deserialization=True` can execute arbitrary code if the index file is tampered with. Only set this if you trust the source.

- **Local Data Storage:**  
All data (vector store and chat history) is stored locally. Ensure you secure your environment if exposed to untrusted users.

## Customization

- **Prompt Engineering:**  
The prompt for Alfred can be customized to change the tone, style, or length constraints of the responses.

- **Scaling Options:**  
For production deployments, you might consider using a managed vector database, a persistent chat history database (like SQLite or PostgreSQL), or enhanced security for deserialization.

## License

This project is licensed under the MIT License.


##Jalaj and Anuj is Boss.

---

Enjoy building with DeepSEEK Portal!
