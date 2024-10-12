import React, { useState, useEffect, useContext } from "react";
import authService from "../../services/authService"; 
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
 
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setName(response.data.name);
        setLastname(response.data.lastname);
        setDepartment(response.data.department);
      } catch (error) {
        setError("Failed to load profile data");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await authService.updateProfile({ name, lastname, department });
      setSuccess("Profile updated successfully.");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="container col-md-4">
      <form onSubmit={handleSubmit}>
        <h2>Update Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="form-control"
            placeholder="Enter your lastname"
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="form-control"
            placeholder="Enter your department"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
