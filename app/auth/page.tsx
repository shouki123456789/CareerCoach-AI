"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [mode, setMode] = useState <"login" | "register">("login")
const router = useRouter();
  
const loginUser = async()=>{
  if (!email || !password) {
    alert("Email and password are required");
    return;
  }
  const res = await signIn("credentials",{
    email,
    password,
    redirect:false

  })
  console.log("front end result",res);
  
  if(res?.ok){
    router.push("/chat")
  }else {
    alert("Invalid email or password");
  }
}  
  
  const handleSubmit = async()=>{
    if(!email || !password){
      alert("Email and Password are required")
    }
    if(mode=="register"){
      if(password != cpassword){
        alert("Password do not match")
        return
      }

      const res = await fetch("/api/auth/register",{
        method:"POST",
        body: JSON.stringify({
        email,
        password,
      })
       }) 
      if(res.status==201){
                alert("BLog added successfully")
                console.log("POST RESPONSE:", res.status);
                alert("Account created successfully!");
                setMode("login");      // switch to login
                setPassword("");
                setcPassword("");
                return;

               
            }
        
     
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-home px-4">
      <div className="w-full max-w-md bg-black/60 backdrop-blur rounded-2xl p-8 text-white">

        <h1 className="text-2xl font-medium text-center">
          {mode =="login" ? "Welcome back":"Create your account"}
        </h1>
        <p className="text-center text-slate-300 mt-2">
         {mode == "login"? " Sign in to continue your conversation":"Start your career journey"}
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {mode == "register" && (
            <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
            value={cpassword}
            onChange={(e) => setcPassword(e.target.value)}
          />

          )}

          <button onClick={()=>{
            if (mode === "login") {
              loginUser();
            }else {
              handleSubmit();
            }
            }} className="w-full bg-orange-500 hover:bg-orange-600 text-black font-medium py-3 rounded-xl transition">
           {mode=="login" ? " Sign In":"Create Account"}
          </button>
        </div>

       {mode =="login" ?(
         <p className="text-center text-sm text-slate-400 mt-6">
          Don’t have an account?{" "}
          <button onClick={() => setMode("register")} className="text-orange-400 hover:underline">
            Register
          </button>
        </p>
       ):(
        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <button onClick={() => setMode("login")} className="text-orange-400 hover:underline">
            Sign In
          </button>
        </p>

       )
       }
      </div>
    </div>
  );
}
