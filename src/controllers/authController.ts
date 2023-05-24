import { Request, Response, NextFunction } from "express";
import { IRegisterInput } from "../interfaces/auth";
import userModel from "../models/user";
import { randomBytes } from "crypto";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import config from "../config";

const generateToken = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      name: user.name,
      exp: exp.getTime() / 1000,
    },
    config.jwtSecret
  );
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(true);
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const salt = randomBytes(32);
    const registerInput: IRegisterInput = req.body;
    const hashedPassword = await argon2.hash(registerInput.password, { salt });
    const userRecord = await userModel.create({
      ...registerInput,
      salt: salt.toString("hex"),
      password: hashedPassword,
    });

    const token = generateToken(userRecord);

    if (!userRecord) {
      throw new Error("User cannot be created");
    }

    // await this.mailer.SendWelcomeEmail(userRecord);

    const user = userRecord.toObject();
    Reflect.deleteProperty(user, "password");
    Reflect.deleteProperty(user, "salt");
    return res.json({ user, token }).status(200);
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
