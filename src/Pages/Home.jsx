import React, { useEffect } from "react";
import Hero from "../Components/Hero.jsx";
import Services from "../Components/Services.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../Components/Footer.jsx";
import Products from "../Components/Products.jsx";
import Toplans from "../Components/Toplans.jsx"
import Team from "../Components/Team.jsx";
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
            <Products />
            <Services />
            <Team />
            <Toplans />
            <Footer />
        </div>
    );
};

export default Home;