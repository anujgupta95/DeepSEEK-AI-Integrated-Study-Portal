import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ragUrl = import.meta.env.VITE_RAG_URL;

export default function ChatBot() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I assist you today?" }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    try {
      const response = await fetch(`${ragUrl}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          option: "Search Documents"
          }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-full shadow-md">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-hide">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
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

      {/* Chat Input */}
      <div className="p-2 border-t bg-white flex items-center">
        <Input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="ml-2 p-2">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
