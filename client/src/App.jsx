import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import axios from "axios";

export const ServerUrl = import.meta.env.VITE_SERVER_URL;

function App() {
  useEffect(() => {
  const getUser = async () => {
    try {
      const result = await axios.get(ServerUrl + "/api/user/current-user", {
        withCredentials: true,
      });
      console.log(result);
    } catch (er) {
      console.log(er);
    }
  };
  getUser();
}, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
