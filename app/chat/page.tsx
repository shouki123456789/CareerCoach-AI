"use client";

import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";


export default function ChatPage() {
 
  const router = useRouter();
  const params = useParams();
  const routeChatId = params.chatId as string | undefined;

  interface Message{
    role: "ai" | "user";
    text:string;
   }

  interface Chat {
  _id: string;
  createdAt: string;
  }
  

  const {status} = useSession()
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatId,setChatId] =useState<string |"">("")
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hi 👋 I’m your AI Career Coach. How can I help you today?",
    },
  ]);
 // console.log(messages);
  


 useEffect(() => {
  if (status === "unauthenticated") {
    router.push("/auth");
    return;
  }

  if (status === "authenticated") {
    showChatList();
    
  }

  // If user clicked an existing chat
  if (routeChatId) {
    setChatId(routeChatId);
  }
}, [status, routeChatId]);


  const sendMessage = async () => {
    if (!input.trim()) return;
     if (!chatId) {
    alert("Please start a new chat first");
    return;
  }
       const userMessage = input;
       setMessages((prev) => [ ...prev,{ role: "user", text: userMessage }]);
       setInput("");
       try{
        const res = await fetch("/api/chat",{
            method:"POST",
            body:JSON.stringify({
              chatId,
              message:userMessage}),
        })
        const data = await res.json()
         console.log("checking for chat id",data);
         
         console.log("🧠 AI reply:", data);
        setMessages((prev)=>[...prev, {role:"ai",text:data}])
       }catch(err){
        console.log(err);
        setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    } 
        
  }
 
  const startNewChat = async () => {
  const res = await fetch("/api/chat/new", {
    method: "POST",
  });

  const data = await res.json();

  console.log("🆕 New chat on login:", data.chatId);

  setChatId(data.chatId);

  setMessages([
    {
      role: "ai",
      text: "Hi 👋 I’m your AI Career Coach. How can I help you today?",
    },
  ]);
};

 /* const getAllMessages = async()=>{
    const res = await fetch("/api/chat")
    const data = await res.json();
  //console.log(data[0].text);
   
    if (data.length > 0){
      setMessages(data);
      

    } else {
      setMessages([
         
    {
      role: "ai",
      text: "Hi 👋 I’m your AI Career Coach. How can I help you today?",
    },
      ])
      
    }
    

  }*/

  const clearChat =async (deleteId:string)=>{
    const res = await fetch(`/api/chat/${deleteId}/delete`,{
      method:"DELETE"
    })
    if (!res.ok) {
    alert("Failed to delete chat");
    return;
  }
  alert("chat deleted")
  setChats((prev) =>
    prev.filter((chat) => chat._id !== deleteId)
  );
if (chatId === deleteId) {
  
    router.push("/chat");
  }
    

  }

  const handleNewChat = async()=>{
    const res = await fetch("/api/chat/new",{
      method:"POST"
    })
    const data = await res.json()
    setChatId(data.chatId)
    setMessages([
    {
      role: "ai",
      text: "Hi 👋 I’m your AI Career Coach. How can I help you today?",
    },
  ])
  showChatList();
  }


  const showChatList = async () => {
      const res = await fetch("/api/chat/list");
      if (!res.ok) return;
      const data = await res.json();
      setChats(data.chats);
    };

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-6">
      
      {/* HEADER */}
      

      {/* MESSAGES */}
      <div className="grid grid-cols-[1fr_3fr] gap-6 min-h-screen">
        <div className="overflow-y-auto py-6 space-y-4 border bg-white/10">
        <h6 className="text-white text-center">Your Chats</h6>
        
        {chats.map((chat) => (
            <div key={chat._id} className="flex">
              <button
                
                onClick={() => router.push(`/chat/${chat._id}`)}
                className={`w-full text-white px-3 py-2 mx-auto text-left rounded-lg text-sm transition ${
                  chat._id === chatId
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }`}
              >
                Chat •{" "}
                {new Date(chat.createdAt).toLocaleDateString()}
              </button>
              <button onClick={()=>clearChat(chat._id)} className="flex px-1 py-1 text-gray-200 rounded-xl bg-red-500 hover:bg-red-700  font-medium transition me-2">
              <MdDelete className="text-xl "/> 
              </button>
              
            </div>
            
            
          ))}
          
        </div>
        <div className="overflow-y-auto py-6 space-y-4 border bg-white/10">
        <header className="text-center py-4 border-b border-white/10">
          <div className="flex flex-col" >
            <h1 className="text-lg font-medium text-white">
              AI Career Coach
            </h1>
            <p className="text-sm text-slate-400 mb-4">
              Talk through your career questions
            </p>
          </div>
          <div className="flex justify-end">
            
              <button onClick={handleNewChat} className="flex px-1 py-1 text-gray-200 rounded-xl bg-green-500 hover:bg-green-600  font-medium transition ms-4 me-4">
             <FaRegEdit className="text-xl"/> New Chat
            </button>
          </div>
  
        </header>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ms-3 me-3 ${
                msg.role === "ai"
                  ? "bg-black text-slate-200"
                  : "bg-orange-500 text-black ml-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* INPUT */}
       <div className="grid grid-cols-[1fr_3fr]">
      <button onClick={() =>
        signOut({ callbackUrl: "/auth" })
          }
          className="mx-auto px-2 my-3 rounded-xl bg-green-800 text-white hover:bg-green-600 font-medium transition"
        >
          LOGOUT
        </button>
      <div className="border-t border-white/10 pt-4 flex gap-2">
        <input
           value={input}
  disabled={!chatId}
  onChange={(e) => setInput(e.target.value)}
  placeholder={
    chatId
      ? "Type your message..."
      : "Click 'New Chat' to start chatting"
  }
  className={`flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none ${
    !chatId && "opacity-50 cursor-not-allowed"
  }`}
        />
       
          
          <button
            onClick={sendMessage}
             disabled={!chatId}
            className={`px-6 rounded-xl font-medium transition ${
    chatId
      ? "bg-orange-500 hover:bg-orange-600 text-black"
      : "bg-gray-500 text-gray-300 cursor-not-allowed"
  }`}
>
            Send
          </button>
        </div>
        
      </div>
      
    </div>
  );
}
