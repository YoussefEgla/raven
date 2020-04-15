const express = require("express");
const router = express.Router();
const { singup } = require("../controllers/auth");

router.post("/signup", singup);

module.exports = router;
