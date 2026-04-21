import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import FAQ from "./Pages/Questionandanswer";
import Project from "./Pages/Product";
import Service from "./Pages/Service";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserDashbord from "./Pages/Userdashbord";
import Profile from "./Components/Profile";
import GuestLogin from "./Pages/Guestlogin.jsx";
import Navbar from "./Components/Navbar.jsx";
import ConversationVerify from "./Components/ChatVerification.jsx";
import Chat from "./Pages/Livechat.jsx";
import Admin from "./Pages/AdminDashbord.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Project />} />
        <Route path="/services" element={<Service />} />
        <Route path="/livechat" element={<Chat />} />
        <Route path="/Q&A" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/developer/dashboard" element={<UserDashbord />} />
        <Route path="/admin/dashbord" element={<Admin />} />
        <Route path="/me" element={<Profile />} />
        <Route path="/guest/login" element={<GuestLogin />} />
        <Route path="/verify" element={<ConversationVerify />} />
      </Routes>
    </>
  )
}
export default App