"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Message {
  _id: string;
  role: "ai" | "user";
  text: string;
  createdAt: string;
}
export default function ChatReadPage() {
  const params = useParams();
  const chatId = params.chatId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    if (!chatId) return;
       loadMessages();
  }, [chatId]);
const loadMessages = async () => {
      const res = await fetch(`/api/chat/${chatId}`);
      const data = await res.json();
      setMessages(data.messages);

    };
  

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">
        Chat History
      </h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-4 rounded-lg ${
              msg.role === "ai"
                ? "bg-white/10"
                : "bg-orange-500 text-black"
            }`}
          >
            <p className="text-xs opacity-70 mb-1">
              {msg.role.toUpperCase()} •{" "}
              {new Date(msg.createdAt).toLocaleString()}
            </p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}