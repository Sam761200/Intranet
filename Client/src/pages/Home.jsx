// Home.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Log from "../components/Log";
import Main from "../components/Main/main";

const Home = () => {
  const { authToken } = useContext(AuthContext); 
  console.log("Auth Token:", authToken);

  return (
    <div className="home">
      {authToken ? <Main /> : <Log signin={true} signup={false} />}
    </div>
  );
};

export default Home;
