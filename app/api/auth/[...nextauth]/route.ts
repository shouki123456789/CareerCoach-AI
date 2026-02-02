export const runtime = "nodejs";

import { connectDB } from "@/lib/mongodb";
import users from "@/models/users";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
       
            async authorize(credentials){
                if (!credentials) return null;
                
                
                const { email, password } = credentials;
               // console.log("credentials:",credentials);
                await connectDB()
                const user = await users.findOne({email:credentials.email})
               
                if (!user) {
                     throw new Error("User not found");

                }
                
               
                if (!email || !password) {
                    return null;
                }

                console.log("EMAIL:", credentials.email);
                console.log("USER ID:", user._id.toString());
                const isValid = await bcrypt.compare(credentials.password,user.password)
                if(!isValid) {
                    return null
                }
                
                 console.log("isValid",isValid);
                return{
                    id:user._id.toString(),
                    email:user.email
                }
                
            }
        })
    ],
   
    session:{strategy:'jwt'},
    
    
    secret: process.env.NEXTAUTH_SECRET,

};
const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;