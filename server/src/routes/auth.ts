import express from "express";
import { body } from "express-validator";

import { auth } from "../controllers/";

const router = express.Router();

router
  .route("/signup")
  .post(
    [
      body("email").isEmail().withMessage("Email is invalid"),
      body("username")
        .trim()
        .escape()
        .isLength({ min: 3, max: 15 })
        .withMessage("username is invalid"),
      body("password")
        .trim()
        .isLength({ min: 8, max: 35 })
        .withMessage("password length must be between 8 and 35 characters"),
    ],
    auth.signup
  );

export default router;
