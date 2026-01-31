import mongoose from "mongoose"




const ChatSchema = new mongoose.Schema(
    {
      userEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
  
    },
    {timestamps:true}
)




const Chat =
  mongoose.models.chat ||
  mongoose.model("chat", ChatSchema);
export default Chat;
