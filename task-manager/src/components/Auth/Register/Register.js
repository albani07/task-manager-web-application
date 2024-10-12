import React, { useState } from "react";
import authService from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    try {
      await authService.register({ name, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  const goToLogIn = () => {
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className=" container col-md-4">
        <div className="loginEmail">
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="loginEmail">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="loginEmail">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={goToLogIn}>
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
