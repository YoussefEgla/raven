const express = require("express");
const router = express.Router({ mergeParams: true });

const { createMessage } = require("../controllers/messages");

router.route("/").post(createMessage);

module.exports = router;
