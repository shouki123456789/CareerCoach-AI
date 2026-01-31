import { connectDB } from "@/lib/mongodb";
import Chat from "@/models/chat";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import messeges from "@/models/messeges";





export async function POST() {
    const session = await getServerSession(authOptions)
    if(!session?.user?.email){
        return NextResponse.json({error:"unauthorized"},{status:401})
    }
    await connectDB()
    const chat = await Chat.create({
        userEmail:session.user.email
    })
    await messeges.create({
            chatId: chat._id,
            role: "ai",
            text: "Hi 👋 I’m your AI Career Coach. How can I help you today?",
        });
    return NextResponse.json({ chatId: chat._id },{status:200})
    
}