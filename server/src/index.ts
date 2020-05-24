import express, { request } from "express";
import reqLogger from "morgan";
import cors from "cors";
import { Errors } from "./middleware/";
import { errorsController } from "./controllers";

// init application
const server = express();
import "./models";
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
