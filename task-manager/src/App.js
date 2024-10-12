import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import ProfilePage from "./components/User/profilePage";
import AddTaskPage from "./components/Task/addTaskPage";
import TaskPage from "./components/Task/taskPage";
import UsersPage from "./components/User/UsersPage";
import Header from "./components/Task/header";
import "./App.css";
import TaskEditModal from "./components/Task/taskEditModal";
import EditProfile from "./components/User/editProfilePage";
import ResetPassword from "./components/User/updatePassword";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UsersPage />} />
        <Route path="/editTask/:id" element={<TaskEditModal />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
