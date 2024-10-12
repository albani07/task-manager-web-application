const express = require("express");
const { getUsers } = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

router.get("", authMiddleware, getUsers);

module.exports = router;
