import React, { useEffect } from "react";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import FinalCTA from "../components/Check.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer.jsx";
import Products from "../components/Products.jsx";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, location.pathname, navigate]);

    return (
        <div className="bg-slate-950 text-white">
            <Hero />
            <Services />
            <Products />
            <FinalCTA />
            <Footer />
        </div>
    );
};

export default Home;