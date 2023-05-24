// import 'reflect-metadata'; // We need this in order to use @Decorators

import config from "./config";

import * as express from "express";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });

  app.listen(config.port, (err?: any) => {
    if (err) {
      console.log(err);
      process.exit(1);
      return;
    }

    console.log("################################################");
    console.log(" 🛡️  Server listening on port: ", config.port, " 🛡️ ");
    console.log("################################################");
  });
}

startServer();
