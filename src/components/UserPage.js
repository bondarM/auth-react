import React from "react";
import app from "../firebaseConfig";

const Home = () => {
  return (
    <>
      <h1>User Page</h1>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </>
  );
};

export default Home;