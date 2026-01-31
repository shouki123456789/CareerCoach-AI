import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function GET() {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "user", content: "Reply with only the word OK" },
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}
