import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import events from "../../events";

const Project = () => {
    const [projects, setProjects] = useState([]);

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
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 min-h-screen">

            <div className="max-w-7xl mx-auto px-5">

                {/* HEADER */}
                <div className="mb-16 text-center">

                    <h2 className="text-blue-600 text-xs font-bold tracking-[0.25em] uppercase mb-4">
                        Portfolio
                    </h2>

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 tracking-tight">
                        All Projects
                    </h1>

                    <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                        A complete collection of web and AI projects showcasing real-world problem solving and modern development.
                    </p>

                </div>

                {/* GRID */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {projects?.map((project) => (
                        <div
                            key={project._id}
                            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >

                            {/* IMAGE */}
                            <div className="relative h-44 overflow-hidden">

                                <img
                                    src={project?.images?.[0].url}
                                    alt={project?.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />

                                {/* DARK OVERLAY ON HOVER */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>

                                {/* STATUS BADGE */}
                                <div className="absolute top-3 left-3">
                                    <span
                                        className={`text-[10px] px-3 py-1 rounded-full font-semibold shadow-sm backdrop-blur-md border
                    ${project?.endDate
                                                ? "bg-green-500/10 text-green-600 border-green-200"
                                                : "bg-orange-500/10 text-orange-600 border-orange-200"
                                            }`}
                                    >
                                        {project?.endDate ? "Completed" : "In Progress"}
                                    </span>
                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className="p-5">

                                <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition">
                                    {project?.name}
                                </h3>

                                <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                                    {project?.description}
                                </p>

                                <div className="flex justify-between items-center text-xs">

                                    <span className="text-slate-400 font-medium">
                                        {project?.startingDate}
                                    </span>

                                    <button className="text-blue-600 font-semibold hover:underline hover:translate-x-1 transition flex items-center gap-1">
                                        View <span>→</span>
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