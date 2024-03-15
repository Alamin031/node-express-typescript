import { Request, Response } from "express";
import adminService from "../services/admin.service";

//get all users route
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//delete user route
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await adminService.deleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//update user route
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const updatedUser = await adminService.updateUser(userId, data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//get a 1 user route
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await adminService.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//get admin profile route
export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    const adminId = req.admin?._id; 
    const adminProfile = await adminService.getAdminProfile(adminId);

    if (!adminProfile) {
      res.status(404).json({ error: "Admin profile not found" });
    } else {
      res.status(200).json(adminProfile);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
