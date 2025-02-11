# Software Engineering Project - AI Agent for SEEK

# Gemma Model Document Q&A

Gemma Model Document Q&A is a Streamlit-based application that lets users ask questions based on the content of uploaded PDF documents or perform an internet search for relevant resources. The assistant, named **Alfred**, responds with detailed, in-depth answers using a language model integrated with LangChain.

## Features

- **Document-based Q&A:**  
  Extracts text from PDFs, creates vector embeddings using FAISS, and retrieves relevant document chunks to answer user queries.

- **Web Search Integration:**  
  Uses the Google Custom Search JSON API to fetch relevant external articles, links, and resources.

- **Personalized Assistant:**  
  The assistant always responds as "Alfred," ensuring a consistent conversational style.

- **Interactive User Interface:**  
  Built with Streamlit to provide a smooth user experience, including options to switch between document retrieval and web search.

## Prerequisites

- **Python:** Version 3.7 or higher.
- **API Keys:**
  - **GROQ_API_KEY:** For instantiating the ChatGroq language model.
  - **GOOGLE_API_KEY:** For Google Generative AI Embeddings.
  - **GOOGLE_SEARCH_API_KEY:** For accessing Google Custom Search.
  - **GOOGLE_CX:** Your Google Custom Search Engine ID.
- **Other Dependencies:**  
  Install required packages via the `requirements.txt` file.
- **PDF Files:**  
  Place your PDFs in a folder named `pdf_files` in the project root.

## Installation

1. **Clone the Repository:**


