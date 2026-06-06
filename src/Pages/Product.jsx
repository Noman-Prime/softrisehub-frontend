import React, { useEffect, useState } from "react";
import axios from "axios";
import events from "../../events";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const getProjects = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/project/all`,
                { withCredentials: true }
            );
            setProjects(res.data.Projects);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProjects();

        const result = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/project/all`,
            { withCredentials: true })
        result.onmessage = (event) => {
            try {
                const resp = JSON.parse(event.data)
                if (resp && resp.Projects) {
                    setProjects(resp.Projects)
                }
            } catch (error) {
                console.log("Parsing have an error", error);
            }
        }
        result.onerror = (error) => {
            console.log("EventSource is not working", error);
        }
        return () => (
            result.close()
        )
    }, []);

    return (
        <section className="min-h-screen py-24 bg-slate-50 text-slate-900 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">

                <div className="text-center mb-16">
                    <p className="text-blue-600 text-[11px] tracking-[0.35em] uppercase font-bold mb-3">
                        / Industry Work
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-4">
                        Selected Expertise
                    </h1>
                    <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                        A curated collection of engineered systems and digital solutions.
                    </p>
                </div>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                    {projects?.map((project) => (
                        <div
                            key={project._id}
                            onClick={() => navigate(`/projectview/${project._id}`)}
                            className="group relative w-full max-w-[280px] rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-[0_20px_40px_-15px_rgba(15,23,42,0.06)] active:scale-[0.99] transition-all duration-200 cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="relative h-40 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                                    <img
                                        src={project?.images?.[0].url}
                                        alt={project?.name}
                                        className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider uppercase border shadow-sm
                                            ${project?.endDate
                                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                            }`}
                                        >
                                            {project?.endDate ? "Done" : "Active"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition line-clamp-1 tracking-tight">
                                        {project?.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                                        {project?.description}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 pb-5 pt-2 flex items-center justify-between text-[11px] font-medium border-t border-slate-50">
                                <span className="text-slate-400">{project?.startingDate}</span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/projectview/${project._id}`);
                                    }}
                                    className="text-blue-600 font-bold hover:text-blue-700 transition"
                                >
                                    View Details →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Product;