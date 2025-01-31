import React, { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("login successful!!!");
      } else {
        alert(data.message || "login failed!");
      }
    } catch (error) {
      console.error("error: ", error);
      alert("an error has occured check console");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
