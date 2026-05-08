import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import events from "../../events";
import { useNavigate } from "react-router-dom";

const Project = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

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

    return (
        <section className="min-h-screen py-24 bg-[#050814] text-white relative overflow-hidden">

            <div className="absolute inset-0 opacity-50">
                <div className="absolute top-[-220px] left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-blue-600/10 blur-[180px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-10 relative z-10">

                <div className="text-center mb-20">

                    <p className="text-blue-400 text-[11px] tracking-[0.35em] uppercase font-semibold mb-4">
                        Industry Work
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                        Selected Expertise
                    </h1>

                    <p className="text-white/50 max-w-xl mx-auto text-sm">
                        A curated collection of engineered systems and digital solutions.
                    </p>

                </div>

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {projects?.map((project) => (
                        <div
                            key={project._id}
                            onClick={() => navigate(`/projectview/${project._id}`)}
                            className="group relative w-full max-w-[260px] mx-auto rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] cursor-pointer"
                        >

                            <div className="relative h-36 overflow-hidden">

                                <img
                                    src={project?.images?.[0].url}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent"></div>

                                <div className="absolute top-3 left-3">
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-semibold border backdrop-blur-md
                                        ${project?.endDate
                                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                                            : "bg-orange-500/10 text-orange-300 border-orange-500/20"
                                        }`}
                                    >
                                        {project?.endDate ? "Done" : "Active"}
                                    </span>
                                </div>

                            </div>

                            <div className="p-4">

                                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition line-clamp-1">
                                    {project?.name}
                                </h3>

                                <p className="text-[11px] text-white/50 line-clamp-2 leading-relaxed mb-4">
                                    {project?.description}
                                </p>

                                <div className="flex items-center justify-between text-[10px] text-white/40">

                                    <span>{project?.startingDate}</span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/projectview/${project._id}`);
                                        }}
                                        className="text-blue-400 font-medium hover:text-blue-300 transition"
                                    >
                                        View →
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default Project;