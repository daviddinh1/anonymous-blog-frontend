import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Createcomment({ postId, onCommentAdded }) {
  const [comment, setComment] = useState({ text: "" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build the payload with the postId
    const payload = { ...comment, postId };

    try {
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch("http://localhost:3000/posts/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT token in the header
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);
      if (response.ok) {
        alert("Comment created");
        onCommentAdded(responseData);
        setComment({ text: "" });
      } else {
        alert("There was an issue sending your comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Comment: </label>
        <input
          onChange={handleChange}
          type="text"
          name="text"
          id="comment"
          value={comment.text}
          required
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
}

export default Createcomment;
