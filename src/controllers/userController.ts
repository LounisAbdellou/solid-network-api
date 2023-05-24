import { NextFunction, Request, Response } from "express";
// import middlewares from "../middlewares";
import user from "../models/user";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  user
    .find()
    .then((users) => {
      return res.json({ users }).status(200);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getSpecificUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  user
    .find()
    .then((users) => {
      return res.json({ users }).status(200);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  user
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .then((user) => {
      return res.json({ user }).status(201);
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  user
    .findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then((user) => {
      return res.json({ user }).status(201);
    });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  user.findOneAndDelete().then(() => {
    return res.send("User successfully deleted !").status(201);
  });
};
