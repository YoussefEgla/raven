require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./controllers/error");
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");

const app = express();

app.use(express.json(), cors());

/**
 * Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages", messagesRoutes);

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
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servr started at port ${PORT}`);
});
