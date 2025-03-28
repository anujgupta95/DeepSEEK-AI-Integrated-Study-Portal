import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader, Trash2, Download, Share2, Phone, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import { useUser } from "@/context/UserContext";
import "jspdf-autotable"; // For handling tables if needed

const apiUrl = import.meta.env.VITE_API_URL;

export default function ChatBot() {
  const { profile } = useUser();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for managing dropdown visibility
  const chatEndRef = useRef(null);
  const moduleId = searchParams.get("moduleId");

  useEffect(() => {
    handleClearChat();
  }, [moduleId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: input,
          history: messages,
          moduleId: moduleId,
          email: profile?.email,
        }),
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
    let y = 20;

    const userName = profile?.name.split(" ")[0] || "User";

    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Chat Summary", 105, y, { align: "center" });
    y += 10;

    doc.setLineWidth(0.5);
    doc.line(10, y, 200, y);
    y += 8;

    messages.forEach(({ sender, text }) => {
      const senderLabel = sender === "user" ? userName : "Alfred";

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${senderLabel}:`, 10, y);
      y += 6;

      doc.setFont("helvetica", "normal");

      if (text.includes("```")) {
        const codeContentMatch = text.match(/```([\s\S]*?)```/);
        if (codeContentMatch) {
          const codeContent = codeContentMatch[1].trim();
          const codeLines = codeContent.split("\n");
          const codeHeight = codeLines.length * 5 + 4;

          doc.setFillColor(240, 240, 240);
          doc.rect(10, y - 2, 180, codeHeight, "F");

          doc.setFont("courier", "normal");
          doc.setFontSize(8);

          codeLines.forEach((line) => {
            doc.text(line, 12, y);
            y += 5;
          });

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
        }
      } else {
        const wrappedText = doc.splitTextToSize(text, 180);
        doc.text(wrappedText, 12, y);
        y += wrappedText.length * 5;
      }

      y += 6;
      if (y > 270) {
        doc.addPage();
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

  const handleShareChat = (platform) => {
    const chatText = messages
      .map((msg) => `${msg.sender === "user" ? "You" : "Alfred"}: ${msg.text}`)
      .join("\n\n");

    const encodedChat = encodeURIComponent(chatText);

    if (platform === "whatsapp") {
      const url = `https://api.whatsapp.com/?text=${encodedChat}`;
      window.open(url, "_blank");
    } else if (platform === "email") {
      const subject = "Chat Summary from Alfred AI Assistant";
      const body = `Here is the chat summary:\n\n${chatText}`;
      const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(url, "_blank");
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
          <span className="ml-2">PDF</span>
        </Button>

        {/* Dropdown for sharing */}
        <div className="relative">
          <Button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 bg-gray-500 hover:bg-gray-600 text-white"
          >
            <Share2 className="w-4 h-4" />
            <span className="ml-2">Share</span>
          </Button>
          {isDropdownOpen && (
            <div className="absolute bottom-full mb-2 right-0 bg-white border border-gray-300 shadow-lg rounded-md w-48">
              <Button
                onClick={() => handleShareChat("whatsapp")}
                className=" w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
              <Button
                onClick={() => handleShareChat("email")}
                className=" w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
