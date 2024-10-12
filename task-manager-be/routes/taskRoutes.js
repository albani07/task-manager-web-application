const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getTasks,
  getTaskById,
  addNewTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/:id", authMiddleware, getTaskById);
router.get("", authMiddleware, getTasks);
router.post("", authMiddleware, addNewTask);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);

module.exports = router;
