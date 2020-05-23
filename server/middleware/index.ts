require("dotenv").config();
import express from "express";

const server = express();

if (process.env.NODE_ENV === "production") {
  // prod only middleware
} else if (process.env.NODE_ENV === "staging") {
  // staging only middleware
} else if (process.env.NODE_ENV === "development") {
  // development only middleware
  const logger = require("morgan");
  server.use(logger("dev"));
} else {
  // exit process if ENV isn't explicitly specified
  console.error('NODE_ENV is not ("production" | "staging" | "development")');
  process.exit(1);
}

export default server;
