import mongoose, { Document, Schema } from "mongoose";
import { AdminModel } from "../interface/admin.interface";

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const Admin = mongoose.model<AdminModel>("Admin", adminSchema);
