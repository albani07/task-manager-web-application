import axios from "axios";

const API_URL = "http://localhost:3002/auth";

const login = async (credentials) => {
  return await axios.post(API_URL + "/login", credentials);
};

const register = async (user) => {
  try {
    const response = await axios.post(API_URL + "/register", user);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network error");
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

const getConfig = () => ({
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});
const getProfile = async () => {
  const config = getConfig();

  return await axios.get(API_URL + "/profile", config);
};

const updateProfile = async (profileData) => {
  const config = getConfig();
  return await axios.put(API_URL + "/profilePage", profileData, config);
};

const updatePassword = async (passwordData) => {
  const config = getConfig();
  return await axios.put(
    API_URL + "/profilePage/password",
    passwordData,
    config
  );
};

export default {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  updatePassword,
};
