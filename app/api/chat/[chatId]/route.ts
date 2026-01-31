import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import messeges from "@/models/messeges";

export async function GET(
  req:NextRequest,
  { params }: { params: Promise<{chatId:string}> }
) {
  await connectDB();
 const {chatId} = await params
  const messages = await messeges
    .find({ chatId})   // ✅ KEY LINE
    .sort({ createdAt: 1 })            // oldest → newest
    .lean();

  return NextResponse.json({ messages }, { status: 200 });
}
