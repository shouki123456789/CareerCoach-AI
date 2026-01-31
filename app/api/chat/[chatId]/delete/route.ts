import { connectDB } from "@/lib/mongodb";
import chat from "@/models/chat";
import messeges from "@/models/messeges";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req:NextRequest,
    {params}:{params:{chatId:string}}
) {
    try{
        await connectDB()
        const {chatId} = await params
        await messeges.deleteMany({ chatId });

    // 2️⃣ Delete the chat itself
    await chat.findByIdAndDelete(chatId);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
        

    }
    
}