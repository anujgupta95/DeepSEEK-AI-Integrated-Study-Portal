import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader, Trash2, Download } from "lucide-react"; // Import Trash2 for Clear Chat
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import { useUser } from "@/context/UserContext";
import "jspdf-autotable"; // For handling tables if needed
import { marked } from "marked"; // For Markdown parsing
import { stripHtml } from "string-strip-html"; // To clean HTML if necessary

const ragUrl = import.meta.env.VITE_RAG_URL;

export default function ChatBot() {
  const { profile } = useUser();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const response = await fetch(`${ragUrl}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, option: "Search Documents" }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    let y = 20; // Start position
  
    // Fetch user's name (fallback to "User")
    const userName = profile?.name.split(" ")[0] || "User";
  
    // Title
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Chat Summary", 105, y, { align: "center" });
    y += 10;
  
    // Line separator
    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 8;
  
    // Format chat messages
    messages.forEach(({ sender, text }) => {
      const senderLabel = sender === "user" ? userName : "Alfred";
  
      // Bold sender name
      doc.setFontSize(10); // Smaller font size
      doc.setFont("helvetica", "bold");
      doc.text(`${senderLabel}:`, 10, y);
      y += 6;
  
      doc.setFont("helvetica", "normal");
  
      if (text.includes("```")) {
        // Extract code block content
        const codeContentMatch = text.match(/```([\s\S]*?)```/);
        if (codeContentMatch) {
          const codeContent = codeContentMatch[1].trim();
          const codeLines = codeContent.split("\n");
  
          // Dynamic height calculation for the code block
          const codeHeight = codeLines.length * 5 + 4;
  
          // Draw background for code
          doc.setFillColor(240, 240, 240); // Light gray background
          doc.rect(10, y - 2, 180, codeHeight, "F");
  
          // Set monospaced font for code
          doc.setFont("courier", "normal");
          doc.setFontSize(8);
  
          // Render each line of code properly
          codeLines.forEach((line) => {
            doc.text(line, 12, y);
            y += 5; // Move down for the next line
          });
  
          // Reset font for normal text
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
        }
      } else {
        // Split text to fit within the document width (180px)
        const wrappedText = doc.splitTextToSize(text, 180);
        doc.text(wrappedText, 12, y);
        y += wrappedText.length * 5; // Move down based on text height
      }
  
      y += 6; // Extra spacing between messages
      if (y > 270) {
        doc.addPage(); // Add new page if content exceeds page height
        y = 20;
      }
    });
  
    doc.save("chat.pdf");
  };
  
  
  
  

  const handleClearChat = () => {
    setMessages([
      { sender: "bot", text: "Hello! How can I assist you today?" },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full shadow-md">
      <div className="p-4 border-b flex justify-between">
        <h1 className="text-lg font-bold">Alfred: AI Assistant</h1>
        <Button
          onClick={handleClearChat}
          className="p-2 bg-red-500 hover:bg-red-600 text-white"
        >
          <Trash2 className="w-4 h-4" />
          <span className="ml-2">Clear Chat</span>
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-lg px-3 py-2 text-white text-sm max-w-[80%] ${
                msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input and Buttons */}
      <div className="p-2 border-t bg-white flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          disabled={loading}
        />
        <Button onClick={handleSendMessage} className="p-2" disabled={loading}>
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
        <Button
          onClick={handleDownloadPDF}
          className="p-2 bg-green-500 hover:bg-green-600 text-white"
        >
          <Download className="w-4 h-4" />
          <span className="ml-2">Convert to PDF</span>
        </Button>
      </div>
    </div>
  );
}
