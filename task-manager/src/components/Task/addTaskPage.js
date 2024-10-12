import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addTaskPAge.css";
import taskService from "../../services/taskService";

function AddTaskPage() {
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await taskService.createTask({ ...taskData });
      navigate("/tasks");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="addTask">
          <label>
            Task Name:
            <input
              type="text"
              name="name"
              value={taskData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="addTask">
          <label>
            Description:
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="addTask">
          <label>
            Status:
            <select
              name="status"
              value={taskData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose your status
              </option>
              <option value="1">Pending</option>
              <option value="2">In Progress</option>
              <option value="3">Completed</option>
            </select>
          </label>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskPage;
