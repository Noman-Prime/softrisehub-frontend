import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    FiCalendar,
    FiUser,
    FiLink,
    FiImage,
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi";

const ProjectView = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchProject = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/project/find/${id}`,
                { withCredentials: true }
            );

            setProject(res.data.Project);
            setCurrentIndex(0);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProject();
    }, [id]);

    const images = project?.images || [];

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading project...
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Project not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

            {/* MAIN CARD (REDUCED SIZE) */}
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">

                {/* IMAGE SLIDER */}
                <div className="relative h-64 bg-black">

                    {images.length > 0 ? (
                        <>
                            <img
                                src={images[currentIndex].url}
                                className="w-full h-full object-cover"
                            />

                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                                    >
                                        <FiChevronLeft />
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                                    >
                                        <FiChevronRight />
                                    </button>

                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                        {images.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 rounded-full transition-all ${
                                                    i === currentIndex
                                                        ? "w-4 bg-white"
                                                        : "w-2 bg-white/50"
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-white gap-2">
                            <FiImage /> No Images
                        </div>
                    )}
                </div>

                {/* CONTENT (COMPACT) */}
                <div className="p-5 space-y-4">

                    {/* TITLE */}
                    <h1 className="text-xl font-bold text-slate-900">
                        {project.name}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {project.description}
                    </p>

                    {/* INFO ROW */}
                    <div className="grid grid-cols-3 gap-3">

                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <FiUser className="mx-auto text-blue-600 mb-1" />
                            <p className="text-[10px] text-gray-400">Status</p>
                            <p className="text-xs font-semibold capitalize">
                                {project.status}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <FiCalendar className="mx-auto text-green-600 mb-1" />
                            <p className="text-[10px] text-gray-400">Start</p>
                            <p className="text-xs font-semibold">
                                {project.startingDate || "N/A"}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                            <FiCalendar className="mx-auto text-red-600 mb-1" />
                            <p className="text-[10px] text-gray-400">End</p>
                            <p className="text-xs font-semibold">
                                {project.endDate || "N/A"}
                            </p>
                        </div>

                    </div>

                    {/* LINKS */}
                    <div className="flex gap-3 pt-2">

                        {project.gitHubLink && (
                            <a
                                href={project.gitHubLink}
                                target="_blank"
                                className="text-xs text-blue-600 flex items-center gap-1"
                            >
                                <FiLink size={14} /> GitHub
                            </a>
                        )}

                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                className="text-xs text-green-600 flex items-center gap-1"
                            >
                                <FiLink size={14} /> Live
                            </a>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProjectView;