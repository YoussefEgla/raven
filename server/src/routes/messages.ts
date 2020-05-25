import express from "express";
import { messages } from "../controllers";
const router = express.Router({ mergeParams: true });

// prefix - /api/users/id/messages
router.route("/").post(messages.createMessage);

router
  .route("/:message_id")
  .get(messages.getMessage)
  .delete(messages.deleteMessage);

export default router;
