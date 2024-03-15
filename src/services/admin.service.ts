import { Admin } from "../models/admin.entity";
import * as bcrypt from "bcrypt";
import { AdminModel } from "../interface/admin.interface";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../interface/user.interface";
import { User } from "../models/user.entity";

export class AdminService {
  async getAllUsers(): Promise<UserModel[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error("Fetching users failed: " + error.message);
    }
  }

  //delete user
  async deleteUser(userId: string): Promise<UserModel | null> {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser ? deletedUser.toObject() : null;
    } catch (error: any) {
      throw new Error("Deleting user failed: " + error.message);
    }
  }

  //update user
  async updateUser(userId: string, data: any) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      if (data.password) {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      return updatedUser;
    } catch (error: any) {
      throw new Error("Updating user failed: " + error.message);
    }
  }

  //get a 1 user
  async getUser(userId: string): Promise<UserModel | null> {
    try {
      const user = await User.findById(userId);
      return user ? user.toObject() : null;
    } catch (error: any) {
      throw new Error("Fetching user failed: " + error.message);
    }
  }

  //get admin profile
  async getAdminProfile(adminId: string): Promise<AdminModel | null> {
    try {
      const admin = await Admin.findById(adminId);
      return admin ? admin.toObject() : null;
    } catch (error: any) {
      throw new Error("Fetching admin profile failed: " + error.message);
    }
  }
}
export default new AdminService();
