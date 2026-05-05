import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import socket from "../socket";
import events from "../../events";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
    const [projects, setProjects] = useState([]);
    const scrollRef = useRef();

    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/project/all`,
                    { withCredentials: true }
                );
                setProjects(response.data.Projects);
            } catch (error) {
                console.error(error);
            }
        };

        getProjects();

        socket.on("connect", getProjects);
        socket.on(events.PROJECT_UPDATED, getProjects);

        return () => {
            socket.off(events.PROJECT_UPDATED, getProjects);
            socket.off("connect", getProjects);
        };
    }, []);

    const scroll = (direction) => {
        const container = scrollRef.current;
        const scrollAmount = 320;

        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    // ✅ ONLY 4 PROJECTS
    const visibleProjects = projects.slice(0, 4);

    return (
        <section className="py-24 bg-[#0B0F19] text-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-14">
                    <div>
                        <h2 className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
                            Portfolio
                        </h2>
                        <h3 className="text-4xl font-bold">
                            Featured Projects
                        </h3>
                    </div>

                    <Link
                        to="/projects"
                        className="text-blue-400 text-sm font-medium hover:text-blue-300 transition"
                    >
                        See All →
                    </Link>
                </div>

                {/* Slider */}
                <div className="relative">

                    {/* Left */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur border border-white/10 p-3 rounded-full hover:bg-white/10 transition"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Cards */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth px-4"
                    >
                        {visibleProjects.map((project) => (
                            <div
                                key={project._id}
                                className="group w-[260px] flex-shrink-0 rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-lg hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] transition-all duration-500"
                            >
                                {/* Image */}
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={project?.images?.[0].url}
                                        alt={project?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="text-sm font-semibold mb-2 line-clamp-1 group-hover:text-blue-400 transition">
                                        {project?.name}
                                    </h3>

                                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                                        {project?.description}
                                    </p>

                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span>{project?.startingDate}</span>

                                        <button className="text-blue-400 hover:underline">
                                            View →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* ✅ 5th CARD = SEE ALL */}
                        <Link
                            to="/projects"
                            className="w-[260px] flex-shrink-0 flex items-center justify-center rounded-2xl border border-dashed border-blue-400/40 bg-blue-500/5 hover:bg-blue-500/10 transition-all"
                        >
                            <span className="text-blue-400 font-medium">
                                See All →
                            </span>
                        </Link>
                    </div>

                    {/* Right */}
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/5 backdrop-blur border border-white/10 p-3 rounded-full hover:bg-white/10 transition"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Products;