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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project/find/${id}`, { withCredentials: true });
      setProject(res.data.Project);
      setIndex(0);
    } catch (err) {
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (id) fetchProject(); }, [id]);

  const images = project?.images || [];
  const statusColor = {
    pending: "text-orange-600 bg-orange-50 border-orange-200",
    building: "text-blue-600 bg-blue-50 border-blue-200",
    completed: "text-green-600 bg-green-50 border-green-200"
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading project...</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500 font-medium">Project not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-slate-50 to-sky-50/30 flex justify-center items-center p-4 sm:p-6 md:py-16">
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-sky-100 bg-white shadow-xl shadow-sky-100/40">
        <div className="relative h-48 sm:h-72 bg-slate-100">
          {images.length > 0 ? (
            <>
              <img src={images[index].url} className="w-full h-full object-cover" alt="" />
              {images.length > 1 && (
                <>
                  <button onClick={() => setIndex(index === 0 ? images.length - 1 : index - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white backdrop-blur-sm transition-all"><FiChevronLeft /></button>
                  <button onClick={() => setIndex(index === images.length - 1 ? 0 : index + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white backdrop-blur-sm transition-all"><FiChevronRight /></button>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400"><FiImage className="mr-2" /> No Image</div>
          )}
          <div className="absolute top-4 left-4">
            <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${statusColor[project.status] || "text-slate-600 bg-slate-50 border-slate-200"}`}>{project.status}</span>
          </div>
        </div>
        <div className="p-5 sm:p-8 space-y-5">
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">{project.name}</h1>
          <p className="text-sm text-slate-600 leading-relaxed break-words">{project.description || "No description provided."}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Start Date</p>
              <p className="text-slate-700 font-semibold flex items-center gap-2 text-sm sm:text-base"><FiCalendar className="text-blue-500" /> {project.startingDate || "—"}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">End Date</p>
              <p className="text-slate-700 font-semibold flex items-center gap-2 text-sm sm:text-base"><FiCalendar className="text-blue-500" /> {project.endDate || "—"}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            {project.gitHubLink && (
              <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-medium flex items-center gap-2 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl border border-blue-100 transition-all shadow-sm"><FiLink /> GitHub</a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-sm font-medium flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-100 transition-all shadow-sm"><FiLink /> Live Demo</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;

{/*this file is under update and not completed yet */}