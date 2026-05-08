import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/project/all`,
                    { withCredentials: true }
                );
                setProjects(res.data.Projects || []);
            } catch (err) {
                console.log(err);
            }
        };

        getProjects();
    }, []);

    const visibleProjects = projects.slice(0, 5);

    return (
        <section className="py-28 bg-[#0B0F19] text-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Selected Expertise
                    </h3>

                    <p className="text-slate-400 text-sm md:text-base mt-5 max-w-2xl mx-auto leading-relaxed">
                        A collection of systems, platforms, and products designed and built for real-world performance and scalability.
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    {visibleProjects.map((project) => (
                        <div
                            key={project._id}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 hover:border-blue-500/40 transition-all duration-300"
                        >

                            <div className="h-40 overflow-hidden">
                                <img
                                    src={project?.images?.[0]?.url}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </div>

                            <div className="p-5">

                                <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition">
                                    {project.name}
                                </h3>

                                <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                                    {project.description}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {project.startingDate}
                                </p>

                            </div>

                        </div>
                    ))}

                    <Link
                        to="/projects"
                        className="flex items-center justify-center rounded-2xl border border-dashed border-blue-400/40 bg-blue-500/5 hover:bg-blue-500/10 transition group"
                    >
                        <div className="text-center space-y-2">

                            <p className="text-blue-400 font-semibold flex items-center justify-center gap-2">
                                Explore All
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                            </p>

                            <p className="text-xs text-slate-500">
                                View complete portfolio
                            </p>

                        </div>
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default Products;