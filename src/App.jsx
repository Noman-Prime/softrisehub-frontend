import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Project from "./Pages/Product";
import Service from "./Pages/Service";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Components/Profile";
import ProjectView from "./Components/ProjectView";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projectview/:id" element={<ProjectView />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/me" element={<Profile />} />
        {/* Temporarily comment this out or point to a valid frontend page */}
        {/* <Route path="/plans" element={<Plans />} /> */}
      </Routes>
    </>
  );
};

export default App;