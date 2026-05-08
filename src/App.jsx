import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Projects from "./Pages/Product";
import Service from "./Pages/Service";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Packages from "./Pages/Packages";
import About from "./Pages/About";

import Profile from "./Components/Profile";
import ProjectView from "./Components/ProjectView";
import AdminDashboard from "./Pages/Admindashbord";

const App = () => {
  return (
    <div className="min-h-screen bg-[#050814] text-white">

      <Navbar />

      <Routes>

        {/* MAIN PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projectview/:id" element={<ProjectView />} />
        <Route path="/services" element={<Service />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROFILE (FIXED - NOW USES ID) */}
        <Route path="/users/:id" element={<Profile />} />

        {/* ADMIN */}
        <Route path="/admindashboard" element={<AdminDashboard />} />

      </Routes>

    </div>
  );
};

export default App;