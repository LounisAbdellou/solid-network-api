import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import routes from "../routes";
import config from "../config";
export default async ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable("trust proxy");

  app.use(cors());

  app.use(require("method-override")());

  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found") as any;
    err.status = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
