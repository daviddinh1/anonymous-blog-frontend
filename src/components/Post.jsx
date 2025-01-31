import React, { useState, useEffect } from "react";

const Post = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //get data using useEffect hook
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

  //output data to see what it looks like as a .json
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <ul>
        <li>postId: {data.id}</li>
        <li>userId: {data.userId}</li>
        <li>createdAt: {data.createdAt}</li>
        <li>body: {data.body}</li>
        <li>comments: {data.comment}</li>
      </ul>
    </div>
  );
};

export default Post;
