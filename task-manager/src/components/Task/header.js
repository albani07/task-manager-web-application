import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
   
    if (
      !isLoggedIn &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <header className="header">
      <div className="container col-10">
        <nav>
          <ul>
            <li>
              <Link to="/profilePage">Profile</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/add-task">Add New Task</Link>
            </li>
            {localStorage.getItem("roleId") == 1 ? (
              <li>
                <Link to="/user">My Users</Link>
              </li>
            ) : null}

            <li>
              {isLoggedIn ? <Link onClick={logout}>Sign Out</Link> : null}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
