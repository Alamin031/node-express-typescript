import { Document } from "mongoose";

export interface AdminModel extends Document {
  name: string;
  email: string;
  phoneNumber?: string;
  password: string;
}
