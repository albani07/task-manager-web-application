const pool = require("./../config/db");

exports.getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.roleId == 1) {
      [tasks] = await pool.query("SELECT * FROM task");
    } else {
      [tasks] = await pool.query("SELECT * FROM task where userId = ?", [
        req.user.userId,
      ]);
    }

    res.status(200).json(tasks);
  } catch {
    return res
      .status(500)
      .json({ message: "error happend while fetching the tasks" });
  }
};

exports.addNewTask = async (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description || !status) {
    return res
      .status(400)
      .json({ message: "All fields (name, description, status) are required" });
  }

  try {
    // Add the new task to the tasks array
    let [result] = await pool.query(
      "insert into task (name, description, status, userId) values (?, ?, ?, ?)",
      [name, description, status, req.user.userId]
    );
    res.status(201).json({ id: result.insertId, name, description, status });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error happend while adding the task" });
  }
};
 
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    let result;
    if (req.user.roleId == 1) {
      [result] = await pool.query("DELETE FROM task WHERE id = ?", [id]);
    } else {
      [result] = await pool.query(
        "DELETE FROM task WHERE id = ? AND userId =?",
        [id, req.user.userId]
      );
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, the task with the provided ID doesn't exist
      return res.status(404).json({ message: "Task not found" });
    }

    // Return success response if task was deleted
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  if (!name || !description || !status) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    let result;
    if (req.user.roleId == 1) {
      [result] = await pool.query(
        "UPDATE task SET name = ?, description = ?, status = ? WHERE id = ?",
        [name, description, status, id]
      );
    } else {
      [result] = await pool.query(
        "UPDATE task SET name = ?, description = ?, status = ? WHERE id = ? and userId= ?",
        [name, description, status, id, req.user.userId]
      );
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID not provided" });
  }

  let tasks;
  if (req.user.roleId == 1) {
    [tasks] = await pool.query("SELECT * FROM task where id = ?", [id]);
  } else {
    [tasks] = await pool.query(
      "SELECT * FROM task where id = ? AND userId = ?",
      [id, req.user.userId]
    );
  }

  if (!tasks || tasks.length == 0) {
    return res.status(404).json({ message: `Task with ID ${id} not found` });
  }

  res.status(200).json(tasks[0]);
};
