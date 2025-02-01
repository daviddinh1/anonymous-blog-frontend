import React, { useState, useEffect } from "react";
import Createcomment from "./Createcomment";

const Post = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the post data, which includes comments, using useEffect.
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response is not working");
        }
        return response.json();
      })
      .then((jsonData) => {
        console.log("Fetched post data:", jsonData);
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        alert(error);
      });
  }, []);

  // Callback to update the post's comments when a new comment is added.
  const handleCommentAdded = (newComment) => {
    console.log("New comment received:", newComment);
    setData((prevData) => ({
      ...prevData,
      // Ensure that comments is treated as an array.
      comments: prevData.comments
        ? [...prevData.comments, newComment]
        : [newComment],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h2>Post</h2>
      <p>{data.body}</p>
      <h3>Comments</h3>
      {data.comment &&
      Array.isArray(data.comment) &&
      data.comment.length > 0 ? (
        <ul>
          {data.comment.map((comment) => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
      {/* Pass the postId and the callback to Createcomment */}
      <Createcomment postId={data.id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default Post;
