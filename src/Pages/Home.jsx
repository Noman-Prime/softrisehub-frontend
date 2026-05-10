import React, { useEffect } from "react";
import Hero from "../Components/Hero.jsx";
import Services from "../Components/Services.jsx";
import FinalCTA from "../Components/Check.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer.jsx";
import Products from "../Components/Products.jsx";

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