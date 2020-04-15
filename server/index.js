require("dotenv").config();
const express = require("express");
const db = require("./models");
const cors = require("cors");
const errorHandler = require("./controllers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const app = express();

app.use(express.json(), cors());

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);
app.get("/api/messages", loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("User", { username: true, profileImageUrl: true });
    return res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  let err = new Error("Not Found");
  // @ts-ignore
  err.status = 404;
  next(err);
});
app.use(errorHandler);
/**
 * Start Server
 */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servr started at port ${PORT}`);
});
