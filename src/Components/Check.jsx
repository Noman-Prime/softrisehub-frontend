import React from "react";
import { useNavigate } from "react-router-dom"; // Import this for navigation
import { FiPlus } from "react-icons/fi";

const FinalCTA = () => {
    const navigate = useNavigate(); // Initialize the navigation function

    return (
        <section className="py-28 px-6 bg-[#0B0F19] relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[140px] rounded-full"></div>

            <div className="max-w-4xl mx-auto relative">

                {/* Glass Card */}
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-12 md:p-16 text-center shadow-[0_20px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden">

                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-50"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Let’s build something 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                {" "}exceptional
                            </span>
                        </h2>

                        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                            From AI-powered systems to scalable SaaS platforms, turn your idea into a polished, production-ready product.
                        </p>

                        {/* BUTTON GROUP */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            
                            <button className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300">
                                <span className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-30 group-hover:opacity-50 transition"></span>
                                <span className="relative">Start a Project</span>
                            </button>

                            {/* NAVIGATION BUTTON */}
                            <button 
                                onClick={() => navigate("/plans")} // Shifting to the add package screen
                                className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300"
                            >
                                <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                                Add Package
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;