import React, { useState, useEffect } from "react";
import Createcomment from "./Createcomment";

const Post = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the post data using useEffect
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("network response is not working");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        alert(error);
      });
  }, []);

  // Callback to update the post's comments
  const handleCommentAdded = (newComment) => {
    setData((prevData) => ({
      ...prevData,
      // Assume the post data contains an array called "comments"
      comments: prevData.comments
        ? [...prevData.comments, newComment]
        : [newComment],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        <li>body: {data.body}</li>
        <li>
          Comments:
          {data.comments && data.comments.length > 0 ? (
            <ul>
              {data.comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          ) : (
            " No comments yet."
          )}
        </li>
      </ul>
      {/* Pass the postId and the callback to Createcomment */}
      <Createcomment postId={data.id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default Post;
