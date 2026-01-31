import mongoose, { Schema, Types, model, models } from "mongoose"

export interface IMessage{
    chatId:Types.ObjectId,
    role:"ai"| "user";
    text:string;
    createdAt:Date,
}

const MessageSchema = new Schema<IMessage>({
    
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    role:{
        type:String,
        enum:["ai","user"],
        required:true
    },
    text:{
        type:String,
        required:true
    }
},{
    timestamps: true, // adds createdAt & updatedAt
  }
)

export default models.messeges || model<IMessage>("messeges", MessageSchema);