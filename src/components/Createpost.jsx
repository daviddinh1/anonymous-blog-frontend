import React, { useState } from "react";

const Createpost = () => {
  const [formData, setFormData] = useState({ userId: "", body: "" });
  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        throw new Error("No token found. User is not authenticated.");
      }
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT token in the header
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("this is what data looks like: ", data);
      if (response.ok) {
        alert("post created!!");
      } else {
        alert(data.message || "post is not working");
      }
    } catch (error) {
      console.error("there is an error creating post error: ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="hiddenInput" value={token.id} />
        <label htmlFor="body">Message: </label>
        <input
          type="text"
          onChange={handleChange}
          id="body"
          name="body"
          value={formData.body}
          required
        ></input>

        <button type="submit">Submit post</button>
      </form>
    </div>
  );
};

export default Createpost;
