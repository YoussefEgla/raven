import express from "express";
import cors from "cors";
import { Errors } from "./middleware/";
import { errorsController } from "./controllers";

// init application
const server = express();

/**
 * Global middleware
 */
server.use(express.json(), express.urlencoded({ extended: true }), cors());

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
