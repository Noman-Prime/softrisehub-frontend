import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductPage = () => {
    const [projects, setProjects] = useState([]);

    const getProjects = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project/all`, { withCredentials: true });
            setProjects(res.data.Projects);
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    };

    useEffect(() => {
        getProjects();
        const result = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/project/all`, { withCredentials: true });
        
        result.onmessage = (event) => {
            try {
                const resp = JSON.parse(event.data);
                if (resp && resp.Projects) setProjects(resp.Projects);
            } catch (error) {
                console.error("Parsing error:", error);
            }
        };

        result.onerror = (error) => {
            console.error("EventSource connectivity failure:", error);
        };

        return () => result.close();
    }, []);

    return (
        <section className="py-12 md:py-20 bg-white border-t border-slate-100 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2B3F43]">
                        Digital Solutions We Have Built
                    </h2>
                    <p className="mt-3 text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        We develop web, mobile, and enterprise applications that are designed to be reliable, scalable, and easy to use, helping businesses operate more efficiently and grow with confidence.
                    </p>
                </div>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {projects.map((project) => {
                        const image = project?.images?.[0]?.url || "/logo.png";
                        return (
                            <div
                                key={project._id}
                                className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative"
                            >
                                <div className="w-full flex flex-col h-full">
                                    {/* Image Container */}
                                    <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-50 shrink-0">
                                        <img
                                            src={image}
                                            alt={project.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Inverted Card Info Box */}
                                    <div className="p-5 bg-[#2B3F43] flex-grow flex flex-col justify-between text-white">
                                        <div className="mb-4">
                                            <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-white/90 transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Dynamic Redirect Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                            <span className="text-[11px] text-slate-300 font-mono">
                                                {project.startingDate || "In Development"}
                                            </span>
                                            <Link 
                                                to={`/projectview/${project._id}`}
                                                className="text-xs sm:text-[13px] font-semibold text-white flex items-center gap-1.5 hover:underline decoration-white/40 underline-offset-4"
                                            >
                                                View Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductPage;