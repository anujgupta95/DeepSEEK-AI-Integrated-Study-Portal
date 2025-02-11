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

2. **Create and Activate a Virtual Environment:**


3. **Install the Dependencies:**


4. **Setup Environment Variables:**

Create a `.env` file in the project root with the following content:


## Usage

1. **Add Your PDF Files:**  
Place all your PDFs inside the `pdf_files` folder.

2. **Run the App:**


3. **Interacting with the App:**  
- Enter your question or query into the provided text input.
- Use the radio options to select between **"Search Documents"** and **"Search the Internet"**.
  - **Search Documents:** Retrieves context from your uploaded PDFs and generates answers using the language model.
  - **Search the Internet:** Performs a web search using Google Custom Search and displays relevant articles and resource links.
- The assistant, **Alfred**, will respond with detailed answers or search results accordingly.

## Code Overview

- **app.py:**  
- Loads environment variables.
- Builds a document vector database from PDFs using LangChain's FAISS integration.
- Configures a language model (ChatGroq) with a custom prompt instructing the assistant to respond as Alfred.
- Implements web search integration using the Google Custom Search JSON API.
- Provides an interactive UI using Streamlit for user input and display of responses.

## Contributing

Contributions and feedback are welcome. Feel free to fork the repository and submit pull requests with improvements or new features.

## License

This project is licensed under the MIT License.


