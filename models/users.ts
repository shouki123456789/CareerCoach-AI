import mongoose, { model, models } from "mongoose";

const UsersSchema = new mongoose.Schema(
    {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }


)

const User =
  mongoose.models.users ||
  mongoose.model("users", UsersSchema);

export default User;