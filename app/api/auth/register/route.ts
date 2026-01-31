import { connectDB } from "@/lib/mongodb";
import users from "@/models/users";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        await connectDB();
        const {email,password} = await req.json()
         if (!email || !password) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await users.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true },
      { status: 201 }
    );
       



    }catch(err){
        console.error(err);
    return NextResponse.json(err,{ status: 500 });

    }
    
}