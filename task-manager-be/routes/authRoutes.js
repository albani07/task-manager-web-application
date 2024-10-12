const authMiddleware = require("../middleware/auth");

const express = require("express");
const { register, login, signout } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/signout", authMiddleware, signout);

module.exports = router;
