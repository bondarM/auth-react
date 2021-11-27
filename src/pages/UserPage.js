import React from "react";
import { logOut } from "../redux/authReducer";
import { useAppDispatch } from "../redux/store";

const Home = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => dispatch(logOut())}>Sign out</button>
    </>
  );
};

export default Home;