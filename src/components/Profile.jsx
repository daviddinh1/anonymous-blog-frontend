import React, { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage

        if (!token) {
          throw new Error("No token found. User is not authenticated.");
        }

        const response = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Send JWT token in the header
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized! Token may be invalid or expired.");
        }

        const userData = await response.json();
        console.log(userData);
        setData(userData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to authenticate user.");
      }
    };

    fetchProfile();
  }, []); // Empty array ensures this runs only once

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data ? (
        <ul>
          <li>Message: {data.message}</li>
          <li>Name: {data.user.id}</li>
          <li>Username: {data.user.username}</li>
          <li>Email: {data.user.email}</li>
          <li>Password: {data.user.password}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
