import React, { useState, useEffect } from "react";
import usersService from "../../services/usersService";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const fetchedUsersData = await usersService.getUsers();
        setUsers(fetchedUsersData);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []);

  return (
    <div className="container col-6">
      <h1>Users Profiles</h1>
      {users.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Nr</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UsersPage;
