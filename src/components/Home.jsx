import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Hello world this is the home page
      <Link to="sign-up">Sign up page</Link>
      <Link to="login">Login page</Link>
    </div>
  );
};

export default Home;
