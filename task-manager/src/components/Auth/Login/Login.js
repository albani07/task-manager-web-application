import authService from "../../../services/authService";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let response = await authService.login({ email, password });
    const token = response.data.token;
    login(token);
    navigate("/tasks");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container col-md-4">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <button type="button" onClick={goToRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
