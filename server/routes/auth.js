const express = require("express");
const router = express.Router();
const { singup, singin } = require("../controllers/auth");

router.post("/signup", singup);
router.post("/signin", singin);

module.exports = router;
