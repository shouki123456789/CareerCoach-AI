export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import messeges from "@/models/messeges";
import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";



const groq = new Groq({
    apiKey:process.env.GROQ_API_KEY
})



export async function POST(req:NextRequest){
console.log(" Message from front end:working" );
    /*console.log("USE_AI:", process.env.USE_AI);
    console.log("groq KEY EXISTS:", !!process.env.GROQ_API_KEY);*/
    try{
        await connectDB()
        const body = await req.json()
        const {chatId, message} = body
       
        console.log(" Message from front end:working",body );
        const newMsg = await messeges.create({
            chatId,
            role:'user',
            text:message
        })
        //console.log("Received from frontend:", body);
        
        
        //AI gives replay
        let reply =`I hear you. you said ${newMsg.text}`
        console.log("9️⃣ Initial msg:", newMsg);
        

        //convesation memory
        console.log("➡️ Fetching history...");

const history = await messeges
  .find()
  .sort({ createdAt: -1 })
  .limit(5)
  .lean();

console.log("✅ History result:", history);
        



       if(process.env.USE_AI =="true" && process.env.GROQ_API_KEY){
       // console.log("9️⃣ USEAI:",process.env.GROQ_API_KEY);
        
        const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an AI career coach.Keep replies under 4–5 short sentences,Use bullet points only if helpful.Avoid long explanations,Be clear, practical, and concise,Ask at most ONE follow-up question"
                
            
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

      reply =
        completion.choices[0].message.content ||
        "I couldn’t think of a reply.";
    }

   //  console.log('replay',reply);
       

        await messeges.create({
             chatId,
              role: "ai",
              text: reply,
            });

        return NextResponse.json(reply,{status:200})

    }catch(err){
        console.log(err);
        
        return NextResponse.json(err,{status:500})
    }
}

export async function GET(){
    await connectDB()
    const prevMessages = await messeges.find().sort({createdAt:-1}).limit(10)
    const msg = prevMessages
    return NextResponse.json(prevMessages.reverse(),{status:200})
}

export async function DELETE() {
    try{
        await connectDB();
        await messeges.deleteMany({});
        return NextResponse.json({success:true},{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json({success:false},{status:500})
        
    }
    
}




