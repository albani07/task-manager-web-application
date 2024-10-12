import axios from "axios";

const API_URL = "http://localhost:3002/profile";

const getCurrentUser = async (navigate) => {
  const config = {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      navigate("/login");
    } else {
      console.error("An error occurred:", error);
    }
    throw error;
  }
};

export default { getCurrentUser };
