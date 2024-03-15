import mongoose, { Document, Schema } from "mongoose";
import { UserModel } from "../interface/user.interface";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  Number: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model<UserModel>("User", userSchema);
