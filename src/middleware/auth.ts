import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.entity";
import { UserModel } from "../interface/user.interface";

export const SECRET_KEY: Secret = "your-secret-key";

declare global {
  namespace Express {
    interface Request {
      user?: UserModel;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Please authenticate");
    }
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const user = await User.findOne({
      _id: decoded.userId,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate?" });
  }
};
