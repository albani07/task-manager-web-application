import axios from "axios";

const API_URL = "http://localhost:3002/task";

const getConfig = () => ({
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

const getTasks = async () => {
  const config = getConfig();
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createTask = async (body) => {
  const config = getConfig();
  return await axios.post(API_URL, body, config);
};

const updateTask = async (id, task) => {
  const config = getConfig();
  await axios.put(`${API_URL}/${id}`, task, config);
};

const deleteTask = async (id) => {
  const config = getConfig();
  await axios.delete(`${API_URL}/${id}`, config);
};

const getTaskById = async (id) => {
  const config = getConfig();
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

export default { getTasks, createTask, updateTask, deleteTask, getTaskById };
