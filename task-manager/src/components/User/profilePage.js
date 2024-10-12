import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import profileService from "../../services/profileService";
import ResetPassword from "./updatePassword";

const ProfilePage = () => {
  const [profile, setProfile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userProfile = async () => {
      try {
        const fetchedProfile = await profileService.getCurrentUser();
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    userProfile(); 
  }, []);
 
  const handleUpdateProfile = (task) => {
    navigate(`/editProfile`);
  };

  const handleUpdatePassword = (task) => {
    navigate(`/resetPassword`);
  };

  return (
    <div className="container col-10">
      <h1>Profile</h1>
      <div>
        <h2>About Me</h2>
        <p>
          <strong>Name:</strong> {profile?.name}
        </p>
        <p>
          <strong>LastName:</strong> {profile?.lastname}
        </p>
        <p>
          <strong>Department:</strong> {profile?.department}
        </p>
      </div>
      <button onClick={() => handleUpdateProfile()}>Edit Profile</button>
      <button onClick={() => handleUpdatePassword()}>Edit Password</button>
    </div>
  );
};

export default ProfilePage;
