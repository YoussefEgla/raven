import express from "express";
import { body } from "express-validator";

import { auth } from "../controllers/";

const router = express.Router();

router.route("/signup").post(auth.signup);

router.route("/login").post(auth.login);

export default router;
