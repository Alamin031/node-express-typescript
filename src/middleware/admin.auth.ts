import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Admin } from "../models/admin.entity";
import { AdminModel } from "../interface/admin.interface";

export const SECRET_KEY: Secret = "your-secret-key";

declare global {
  namespace Express {
    interface Request {
      admin?: AdminModel;
    }
  }
}

export const adminauth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Please authenticate");
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const admin = await Admin.findOne({ _id: decoded.adminId });

    if (!admin) {
      throw new Error("Admin not found");
    }

    req.admin = admin;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
