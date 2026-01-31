import mongoose from "mongoose";
const connectionString = process.env.MONGODB_URL as string




export const connectDB =async()=>{
    try{
        const res = mongoose.connect(connectionString)
         console.log("Database Connected");

    }catch(err){
        console.log(err);
        console.log('database connection failed');
        
        
    }
}