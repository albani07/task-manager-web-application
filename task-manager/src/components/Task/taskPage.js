import React, { useState, useEffect } from "react";
import taskService from "../../services/taskService";
import { useNavigate } from "react-router-dom";
import TaskStatusEnum from "../../Models/taskStatusEnum";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await taskService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleUpdateTask = (task) => {
    navigate(`/editTask/${task.id}`);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="container col-6">
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task #</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned User</th>
            <th>Ops</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td style={{ width: "10%" }}>{index + 1}</td>
              <td style={{ width: "20%" }}>{task.name}</td>
              <td style={{ width: "20%" }}>{task.description}</td>
              <td style={{ width: "15%" }}>{TaskStatusEnum[task.status]}</td>
              <td style={{ width: "15%" }}>{task.assignedUser}</td>{" "}
              <td
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <button onClick={() => handleUpdateTask(task)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPage;
