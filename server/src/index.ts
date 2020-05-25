require("dotenv").config();

import express, { Request, Response, NextFunction } from "express";
import reqLogger from "morgan";
import cors from "cors";
import { Errors, auth } from "./middleware/";
import { errorsController } from "./controllers";
import * as router from "./routes";

// init application
const server = express();
import { Message } from "./models";
/**
 * Global middleware
 */
server.use(
  reqLogger("common"),
  cors(),
  express.json(),
  express.urlencoded({ extended: true })
);

/**
 * Application Routes
 */
server.use("/api/auth", router.authRouter);
server.use(
  "/api/users/:id/messages",
  auth.authorize,
  auth.authenticate,
  router.messagesRouter
);
server.get(
  "/api/messages",
  auth.authorize,
  auth.authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = Message.find()
        .sort({ createdAt: "desc" })
        .populate("Accounts", { username: true, profileImageUrl: true });

      return res.status(200).json(messages).end();
    } catch (err) {
      next(err);
    }
  }
);
/**
 * Don't add routes below 404
 */
server.all("/*", async (req, res, next) => {
  next(new Errors.Error404());
});

/**
 * Errors Controller
 */
server.use(errorsController);

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
