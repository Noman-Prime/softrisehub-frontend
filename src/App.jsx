import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx"
import Home from "./Pages/Home.jsx";
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
import FAQ from "./Pages/Questionandanswer.jsx";
import Careers from "./Pages/Careers.jsx";
import Blogs from "./Pages/Blogs.jsx";
import Privacy from "./Pages/Privacy.jsx";
import Terms from "./Pages/Terms.jsx";
import Footer from "./Components/Footer.jsx";
import ProductPage from "./Pages/Product.jsx";
import TeamPage from "./Pages/TeamPage.jsx";
import ServiceView from "./Components/ServiceView.jsx";

const App = () => {
  return (
    <div className="min-h-screen bg-[#050814] text-white">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/projectview/:id" element={<ProjectView />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/:id" element={<Profile />} />
        <Route path="/service/:id" element={<ServiceView />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/FAQs" element={<FAQ />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>

    </div>
  );
}

export default App;