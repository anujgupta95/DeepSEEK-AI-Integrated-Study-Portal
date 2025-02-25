import streamlit as st
import os
import time
import json
from dotenv import load_dotenv
import urllib.parse

# Use the new recommended imports
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_groq import ChatGroq

load_dotenv()

# Load API keys (no need for Google search keys in this version)
groq_api_key = os.getenv("GROQ_API_KEY")
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

st.title("DeepSEEK Portal")

# Initialize the language model (ChatGroq in this case)
llm = ChatGroq(groq_api_key=groq_api_key, model_name="Llama3-8b-8192")

# Define Alfred's prompt template
prompt = ChatPromptTemplate.from_template(
    """
You are 'Alfred', a friendly and knowledgeable assistant.
Answer the following question using the provided context.
Keep the answer brief, but ensure you cover all the essential aspects.
If it is Machine Learning related, aim for 300-400 words;
if it is a Python question, aim for 500-600 words.
Mention the important points in bullets or highlight them.
Include relevant google links if applicable.
If the question is not relevant to the content, answer in 2 lines.
If asked anything about jalaj trivedi tell he is the superhero of the project. He is "RAG-GOD".
Context:
{context}
Question:
{input}
"""
)

# -------------------------------
# Persistent FAISS Vector Store Setup
# -------------------------------
def build_vector_store():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    loader = PyPDFDirectoryLoader("./pdf_files")  # Load PDFs from this folder
    docs = loader.load()  # Document loading

    # Attach metadata: PDF name and page/slide number
    for doc in docs:
        doc.metadata["source"] = doc.metadata.get("source", "Unknown PDF")
        doc.metadata["page"] = doc.metadata.get("page", "Unknown Page")

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    final_docs = text_splitter.split_documents(docs[:20])
    # Set allow_dangerous_deserialization=True (be cautious with this in untrusted environments)
    vectors = FAISS.from_documents(final_docs, embeddings, allow_dangerous_deserialization=True)
    return vectors, embeddings

# Directory where the FAISS vector store is saved
FAISS_INDEX_DIR = "./faiss_index"

if os.path.exists(FAISS_INDEX_DIR):
    # Load the FAISS index from disk with dangerous deserialization enabled (only from trusted sources)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = FAISS.load_local(FAISS_INDEX_DIR, embeddings, allow_dangerous_deserialization=True)
else:
    vector_store, embeddings = build_vector_store()
    vector_store.save_local(FAISS_INDEX_DIR)

st.success("Vector Store DB is ready.")

# -------------------------------
# Persistent Chat History Setup
# -------------------------------
CHAT_HISTORY_FILE = "chat_history.json"

def load_chat_history():
    if os.path.exists(CHAT_HISTORY_FILE):
        with open(CHAT_HISTORY_FILE, "r") as f:
            try:
                history = json.load(f)
            except json.JSONDecodeError:
                history = []
    else:
        history = []
    return history

def save_chat_history(history):
    with open(CHAT_HISTORY_FILE, "w") as f:
        json.dump(history, f)

# -------------------------------
# Main App Logic: Query Handling & Summarization
# -------------------------------
user_query = st.text_input("Enter Your Question or Query")

if user_query:
    # If the query includes "summarize", generate a summary of past chats
    if "summarize" in user_query.lower():
        history = load_chat_history()
        if not history:
            st.write("No chat history available.")
        else:
            conversation = ""
            for chat in history:
                conversation += f"User: {chat['query']}\nAlfred: {chat['answer']}\n"
            summarization_prompt = (
                "You are Alfred, a summarization assistant. "
                "Please summarize the following conversation history in concise bullet points:\n\n"
                + conversation +
                "\nSummary:"
            )
            # Invoke the LLM with a plain string prompt; use .content to get the text
            summary_response = llm.invoke(summarization_prompt)
            st.write("### Chat History Summary:")
            st.write(summary_response.content)
    else:
        # Normal document-based retrieval workflow
        document_chain = create_stuff_documents_chain(llm, prompt)
        retriever = vector_store.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        
        start_time = time.process_time()
        response = retrieval_chain.invoke({"input": user_query})
        elapsed_time = time.process_time() - start_time
        
        st.write(f"Response Time: {elapsed_time:.2f} seconds")
        st.write(f"Alfred: {response['answer']}")
        
        
        
        # Optionally display detailed document similarity search info
        with st.expander("Document Similarity Search Details"):
            if "context" in response and response["context"]:
                for i, doc in enumerate(response["context"]):
                    source = doc.metadata.get("source", "Unknown PDF")
                    page = doc.metadata.get("page", "Unknown Page")
                    content = doc.page_content.strip()
                    st.write(f"### Result {i+1}")
                    st.write(f"**PDF Name:** {source}\n**Page/Slide Number:** {page}\n**Content:**\n{content}\n")
                    st.write("---")
            else:
                st.write("No relevant documents found.")
        
        # Update persistent chat history
        history = load_chat_history()
        history.append({"query": user_query, "answer": response["answer"]})
        save_chat_history(history)
        
         # Add sharing options
        # st.markdown("Share with your Peers:")
        # encoded_answer = urllib.parse.quote(response['answer'])
        # whatsapp_url = f"https://api.whatsapp.com/send?text={encoded_answer}"
        # mailto_url = f"mailto:?subject=Answer to your question&body={encoded_answer}"
        # st.markdown(f'<a href="{whatsapp_url}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20"/> Share via WhatsApp</a>', unsafe_allow_html=True)
        # st.markdown(f'<a href="{mailto_url}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Circle-icons-mail.svg" width="20"/> Share via Mail </a>', unsafe_allow_html=True)
        # st.markdown("---")
        
        
        
        # Add sharing options
        st.markdown("Share with your Peers:")
        share_text = f"Question: {user_query}\nAnswer: {response['answer']}"
        encoded_text = urllib.parse.quote(share_text)
        whatsapp_url = f"https://api.whatsapp.com/send?text={encoded_text}"
        mailto_url = f"mailto:?subject=Question and Answer&body={encoded_text}"
        st.markdown(f'<a href="{whatsapp_url}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20"/> Share via WhatsApp</a>', unsafe_allow_html=True)
        st.markdown(f'<a href="{mailto_url}" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Circle-icons-mail.svg" width="20"/> Share via Mail </a>', unsafe_allow_html=True)
        st.markdown("---")


        
        
        