import express from "express";
import { messages } from "../controllers";
const router = express.Router({ mergeParams: true });

// prefix - /api/users/id/messages
router.route("/").post(messages.createMessage);

export default router;
