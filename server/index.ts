import express from "express";
import middleware from "./middleware";
const server = express();

server.use(middleware);

server.use(express.json(), express.urlencoded({ extended: true }));

server.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
