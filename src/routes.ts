import { Router } from "express";
import * as authController from "./controllers/authController";

const route = Router();

export default () => {
  // Auth //
  route.post("/login", authController.login);
  route.post("/register", authController.register);

  // Users //
  route.get("/users", () => console.log(true));
  route.post("/users", () => console.log(true));
  route.put("/users/:id", () => console.log(true));
  route.delete("/users/:id", () => console.log(true));

  //   route.post(
  //     "/signin",
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         const { email, password } = req.body;
  //         const authServiceInstance = Container.get(AuthService);
  //         const { user, token } = await authServiceInstance.SignIn(
  //           email,
  //           password
  //         );
  //         return res.json({ user, token }).status(200);
  //       } catch (e) {
  //         console.log("🔥 error ", e);
  //         return next(e);
  //       }
  //     }
  //   );

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason behind a logout route could be deleting a 'push notification token'
   * so the device stop receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emited for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   */
  //   route.post(
  //     "/logout",
  //     middlewares.isAuth,
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         //@TODO AuthService.Logout(req.user) do some clever stuff
  //         return res.status(200).end();
  //       } catch (e) {
  //         console.log("🔥 error ", e);
  //         return next(e);
  //       }
  //     }
  //   );
};
