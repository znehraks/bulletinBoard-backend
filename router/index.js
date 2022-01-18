const express = require("express");
const router = express.Router();
const users = require("./users");
const boards = require("./boards");
const auth = require("./auth");

router.use("/api/users", users);
router.use("/api/auth", auth);
router.use("/api/boards", boards);

module.exports = router;
