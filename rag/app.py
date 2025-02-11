import streamlit as st
import os
import time
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import requests  # For web search functionality

load_dotenv()

# Load API keys from environment variables
groq_api_key = os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
google_search_api_key = os.getenv("GOOGLE_SEARCH_API_KEY")  # Add your Google Custom Search API Key here
google_cx = os.getenv("GOOGLE_CX")  # Add your Google Custom Search Engine CX here

st.title("Gemma Model Document Q&A")

# Initialize the language model (ChatGroq is used as an example)
llm = ChatGroq(groq_api_key=groq_api_key,
               model_name="Llama3-8b-8192")

# Updated prompt that sets the assistant's name as Alfred
prompt = ChatPromptTemplate.from_template(
    """
You are Alfred, a friendly and knowledgeable assistant.
Always begin your answer with "Alfred:".
Answer the following question comprehensively using the provided context.
Provide an in-depth and elaborate explanation with relevant examples and detailed insights.
Do not be brief; ensure you cover all the essential aspects with thorough detail.
Context:
{context}
Question:
{input}
"""
)

def vector_embedding():
    if "vectors" not in st.session_state:
        st.session_state.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        st.session_state.loader = PyPDFDirectoryLoader("./pdf_files")  # Data Ingestion
        st.session_state.docs = st.session_state.loader.load()  # Document Loading
        st.session_state.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)  # Chunk Creation
        st.session_state.final_documents = st.session_state.text_splitter.split_documents(st.session_state.docs[:20])
        st.session_state.vectors = FAISS.from_documents(st.session_state.final_documents, st.session_state.embeddings)

# Automatically prepare the vector database on app startup
if "vectors" not in st.session_state:
    with st.spinner("Preparing document vector database..."):
        vector_embedding()
    st.success("Vector Store DB is ready.")

# Function to perform a web search using Google Custom Search JSON API
def perform_web_search(query):
    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": google_search_api_key,
        "cx": google_cx,
        "q": query,
    }
    response = requests.get(search_url, params=params)
    if response.status_code == 200:
        results = response.json().get("items", [])
        return results  # Returns a list of search results (articles, links, etc.)
    else:
        return None

# User input for question or query
prompt1 = st.text_input("Enter Your Question or Query")

# Option for user to select between document retrieval and web search
search_option = st.radio("Choose an Option", ["Search Documents", "Search the Internet"])

if prompt1:
    if search_option == "Search Documents":
        document_chain = create_stuff_documents_chain(llm, prompt)
        retriever = st.session_state.vectors.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        start = time.process_time()
        response = retrieval_chain.invoke({'input': prompt1})
        st.write("Response Time: " + str(time.process_time() - start))
        st.write(f"Alfred: {response['answer']}")

        with st.expander("Document Similarity Search"):
            for i, doc in enumerate(response["context"]):
                st.write(doc.page_content)
                st.write("--------------------------------")
    elif search_option == "Search the Internet":
        with st.spinner("Searching the Internet..."):
            results = perform_web_search(prompt1)
            if results:
                st.write(f"Alfred: Here are some resources I found on the internet:")
                for item in results:
                    title = item.get("title")
                    link = item.get("link")
                    snippet = item.get("snippet")
                    st.write(f"- **{title}**\n  {snippet}\n  [Read more]({link})")
            else:
                st.write(f"Alfred: Sorry, I couldn't find any relevant resources on the internet.")
