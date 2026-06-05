import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx"
import Home from "./Pages/Home.jsx";
import Projects from "./Pages/Product.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Packages from "./Pages/Packages.jsx";
import About from "./Pages/About.jsx";

import Profile from "./Components/Profile.jsx";
import ProjectView from "./Components/ProjectView.jsx";
import AdminDashboard from "./Pages/Admindashbord.jsx";
import ServicePage from "./Pages/Service.jsx";
import Contact from "./Pages/Contact.jsx";
import ScrollToTop from "./Components/ScrollToTop.js";

const App = () => {
  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/projectview/:id" element={<ProjectView />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

      </Routes>

    </div>
  );
}

export default App;