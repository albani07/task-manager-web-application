import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./header.css";
import taskService from "../../services/taskService";

const TaskEditModal = ({ onEditTask }) => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    status: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTasks = await taskService.getTaskById(id);
        setTaskData(fetchedTasks);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [id]);

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
      await taskService.updateTask(id, taskData);
   
      navigate("/tasks"); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const handleCancel = () => {
    navigate("/tasks"); 
  };

  return (
    <div className="container col-6">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type="text"
            name="name"
            value={taskData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
          />
        </label>

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
        <button type="submit">Save Changes</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskEditModal;
