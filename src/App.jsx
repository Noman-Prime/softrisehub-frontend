import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import FAQ from "./Pages/Questionandanswer";
import Project from "./Pages/Product";
import Service from "./Pages/Service";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Components/Profile";
import GuestLogin from "./Pages/Guestlogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import socket from "./socket.js";

const App = () => {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id)
    })

    return () => {
      socket.off("connect")
    }
  }, [])

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Project />} />
        <Route path="/services" element={<Service />} />
        <Route path="/Q&A" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/guest/login" element={<GuestLogin />} />
      </Routes>
    </>
  )
}
export default App