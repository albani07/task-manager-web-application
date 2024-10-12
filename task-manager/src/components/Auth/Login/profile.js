import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const ProfileComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authService.getCurrentUser(navigate);
        console.log(user);
      } catch (error) {
     
      }
    };

    fetchUser();
  }, [navigate]); 

  return <div>Your Profile</div>;
};

export default ProfileComponent;
