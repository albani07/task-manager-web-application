const express = require("express");
const {
  getMyProfile,
  updatePassword,
  updateProfile,
} = require("../controllers/profileController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("", authMiddleware, getMyProfile);
router.put("/updatePassword", authMiddleware, updatePassword);
router.put("", authMiddleware, updateProfile);

module.exports = router;
