import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import events from "../../events";

const Projects = () => {
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

        socket.on(events.PROJECT_UPDATED, getProjects);

        return () => {
            socket.off(events.PROJECT_UPDATED, getProjects);
        };
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                    Selected Projects
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects?.map((project) => (
                        <div
                            key={project._id}
                            className="group relative bg-gray-50 rounded-[30px] overflow-hidden border border-gray-200 transition-all hover:shadow-2xl"
                        >
                            {/* Image */}
                            <div className="h-64 bg-gray-300">
                                <img
                                    src={project?.images?.[0].url}
                                    alt={project?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                                    {project?.name}
                                </h3>
                                
                                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                    {project?.description}
                                </span>

                                <p className="text-gray-600 mb-2">
                                    {project?.startingDate}
                                </p>

                                <p className="text-gray-600 mb-6">
                                    {project?.endDate}
                                </p>

                                <button className="text-blue-600 font-bold hover:underline">
                                    View Case Study →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;