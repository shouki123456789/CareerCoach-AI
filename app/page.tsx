import Link from "next/link";
import { LuBrainCircuit } from "react-icons/lu";
import { GiBrain } from "react-icons/gi";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { HiOutlineMicrophone } from "react-icons/hi";


export default function Home() {
  return (
    <main className="min-h-screen">
      
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-40 text-center">
        <div className="grid md:grid-cols-2">
          <div className="mt-10">
            <h1 className="text-4xl text-white md:text-6xl font-bold leading-tight">
              Your Personal <span className="text-orange-600">AI Career Coach</span>
            </h1>
    
            <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
              A chat-based AI that understands your skills, career gaps, and goals —
              and guides you with personalized, honest career advice.
            </p>
    
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/auth"
                className="px-6 py-3 rounded-xl bg-orange-600 text-white font-medium hover:bg-orange-900 transition"
              >Start Chatting</Link>
            </div>
          </div>
          <div style={{width:'400px',height:'400px', borderRadius:'50%' }} className='bg-home mx-auto mt-10'>
            <img className="mt-16" src="/logo.png"/>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center">
          Why AI Career Coach?
        </h2>

        <p className="mt-6 text-center font-bold text-xl text-slate-800 max-w-3xl mx-auto">
         Career paths aren’t always clear, and everyone’s journey is different.

          <br />
          <span className="font-medium text-slate-800">
           <span className="text-orange-600 font-bold">AI Career Coach </span> is here to listen, understand your situation, and help you take your next step. 
          </span>
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-2xl border  shadow-sm bg-gray-800">
         <BsFillChatRightTextFill  className="text-5xl text-orange-600 mb-5 ms-5"/>
          <h1 className="font-semibold text-lg text-orange-600">Chat-First Experience</h1>
          <p className="mt-3 text-orange-300 text-sm space-y-1">No forms or dashboards. Just natural conversation, like talking to a mentor.</p>
        </div>
          
         <div className="p-6 rounded-2xl border bg-gray-800 shadow-sm">
          <GiBrain  className="text-5xl text-orange-600 mb-5 ms-5" />
          <h1 className="font-semibold text-orange-600 text-lg">Context-Aware Memory</h1>
          <p className="mt-3 text-orange-300 text-sm space-y-1">Remembers your goals, skills, and past discussions to give better advice.</p>
        </div>
        <div className="p-6 rounded-2xl border bg-gray-800 shadow-sm">
          <LuBrainCircuit  className="text-5xl text-orange-600 mb-5 ms-5"/>
          <h1 className="font-semibold text-orange-600 text-lg">Career Gap Reframing</h1>
          <p className="mt-3 text-orange-300 text-sm space-y-1">Identifies career breaks and reframes them professionally and positively.</p>
        </div>
        
        <div className="p-6 rounded-2xl border bg-gray-800 shadow-sm">
          <HiOutlineMicrophone  className="text-5xl text-orange-600 mb-5 ms-5" />
          <h1 className="font-semibold text-orange-600 text-lg">Interview Preparation</h1>
          <p className="mt-3 text-orange-300 text-sm space-y-1">Practice role-based interviews with AI feedback and follow-ups.</p>
        </div>
       
      </section>

      {/* TECH STACK */}
      {/* WHO IS THIS FOR */}
<section className="max-w-5xl mx-auto px-6 py-20">
  <img className="md:ms-28 mb-10" src="/who.png"/>
  <h2 className="text-5xl font-bold text-white text-center">
    Who is this for?
  </h2>

  <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    <div className="p-10 rounded-2xl border  bg-white shadow-sm">
      <h1 className="font-bold text-lg text-orange-600 p-2">Students & Freshers 🎓</h1>
      <p>Not sure where to start? Get clarity on roles, skills, and first steps.</p>
    </div>
    <div className="p-10 rounded-2xl border bg-white shadow-sm">
      <h1 className="font-bold text-lg text-orange-600 p-2">Career Returners 🔄</h1>
      <p>Returning after a break? Get help explaining gaps and rebuilding confidence</p>
    </div>
    <div  className="p-10 rounded-2xl border bg-white shadow-sm">
      <h1 className="font-bold text-lg text-orange-600 p-2">Tech Job Seekers 💻</h1>
      <p>Improve resumes, prepare for interviews, and plan your next move.</p>
    </div>
    <div className="p-10 rounded-2xl border  bg-white shadow-sm">
      <h1 className="font-bold text-lg text-orange-600 p-2">Career Switchers 📈</h1>
      <p>Thinking of changing careers? Get realistic guidance and learning paths.</p>
    </div>
  </div>
</section>
<footer className="text-slate-300">
            <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
  
              <div>
                <h4 className="text-lg font-medium text-white<span text-orange-600">
                  AI Career Coach
                </h4>
                <p className="mt-3 text-sm text-white-400 max-w-xs">
                  A simple place to talk through your career questions and next steps.
                </p>
              </div>
  
              <div>
                <h5 className="text-sm font-medium text-white">Explore</h5>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="/chat" className="hover:text-white">Start Chat</a></li>
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                </ul>
              </div>
  
              <div>
                <h5 className="text-sm font-medium text-white">Support</h5>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="/help" className="hover:text-white">Help</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
  
            <div className="border-t border-slate-800 text-center py-6 text-sm text-slate-500">
              © {new Date().getFullYear()} AI Career Coach. All rights reserved.
            </div>
          </footer>


    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */


