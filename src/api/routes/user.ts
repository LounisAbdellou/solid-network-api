import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
import user from "../../models/user";
const route = Router();

export default (app) => {
  app.use("/users", route);

  route.get("/", (req: Request, res: Response) => {
    user
      .find()
      .then((users) => {
        return res.json({ users }).status(200);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  route.post("/", (req: Request, res: Response) => {
    user
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      .then((user) => {
        return res.json({ user }).status(201);
      });
  });

  route.put("/:id", async (req: Request, res: Response) => {
    user
      .findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )
      .then((user) => {
        return res.json({ user }).status(201);
      });
  });

  route.delete("/:id", (req: Request, res: Response) => {
    user.findOneAndDelete().then(() => {
      return res.send("User successfully deleted !").status(201);
    });
  });
};
