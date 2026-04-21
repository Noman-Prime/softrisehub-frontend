import React, { useEffect } from "react"
import Hero from "../Components/Hero.jsx"
import Services from "../Components/Services.jsx"
import Projects from "../Components/Projects.jsx" // Added this
import FinalCTA from "../Components/Check.jsx"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar.jsx"
import Footer from "../Components/Footer.jsx"

const Home = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        if (location.state?.message) {
            toast.success(location.state.message)
            navigate(location.pathname, { replace: true, state: {} })
        }
    }, [location.state, location.pathname, navigate])
    return (
        <>
            <Hero />
            <Services />
            <Projects />
            <FinalCTA />
            <Footer />
        </>
    )
}

export default Home