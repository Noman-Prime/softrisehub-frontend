import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiCalendar, FiLink, FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProjectView = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/project/find/${id}`,
                { withCredentials: true }
            );
            setProject(res.data.Project);
            setIndex(0);
        } catch (err) {
            toast.error("Failed to load project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProject();
    }, [id]);

    const images = project?.images || [];

    const statusColor = {
        pending: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        building: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        completed: "text-green-400 bg-green-500/10 border-green-500/20"
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050814] text-white/50">
                Loading project...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050814] text-red-400">
                Project not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050814] flex justify-center items-center px-6 py-16">

            <div className="w-full max-w-3xl rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

                {/* IMAGE SECTION */}
                <div className="relative h-72 bg-black">

                    {images.length > 0 ? (
                        <>
                            <img
                                src={images[index].url}
                                className="w-full h-full object-cover"
                            />

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setIndex(index === 0 ? images.length - 1 : index - 1)
                                        }
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white"
                                    >
                                        <FiChevronLeft />
                                    </button>

                                    <button
                                        onClick={() =>
                                            setIndex(index === images.length - 1 ? 0 : index + 1)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full text-white"
                                    >
                                        <FiChevronRight />
                                    </button>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-white/40">
                            <FiImage className="mr-2" /> No Image
                        </div>
                    )}

                    {/* STATUS BADGE */}
                    <div className="absolute top-4 left-4">
                        <span className={`text-[11px] px-3 py-1 rounded-full border backdrop-blur-md ${statusColor[project.status]}`}>
                            {project.status}
                        </span>
                    </div>

                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-5">

                    <h1 className="text-2xl font-bold text-white">
                        {project.name}
                    </h1>

                    <p className="text-sm text-white/60 leading-relaxed">
                        {project.description || "No description provided."}
                    </p>

                    {/* DATES */}
                    <div className="grid grid-cols-2 gap-3 text-sm">

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs text-white/40">Start Date</p>
                            <p className="text-white font-medium flex items-center gap-2">
                                <FiCalendar /> {project.startingDate || "—"}
                            </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                            <p className="text-xs text-white/40">End Date</p>
                            <p className="text-white font-medium flex items-center gap-2">
                                <FiCalendar /> {project.endDate || "—"}
                            </p>
                        </div>

                    </div>

                    {/* LINKS */}
                    <div className="flex gap-4 pt-2">

                        {project.gitHubLink && (
                            <a
                                href={project.gitHubLink}
                                target="_blank"
                                className="text-blue-400 text-sm flex items-center gap-2 hover:text-blue-300"
                            >
                                <FiLink /> GitHub
                            </a>
                        )}

                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                className="text-green-400 text-sm flex items-center gap-2 hover:text-green-300"
                            >
                                <FiLink /> Live
                            </a>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProjectView;