import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/project/all`, { withCredentials: true });
      setProjects(res.data.Projects);
    } catch (err) {
      console.log(err);
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
        console.log("Parsing error:", error);
      }
    };
    result.onerror = (error) => {
      console.log("EventSource is not working", error);
    };
    return () => result.close();
  }, []);

  const visibleProjects = projects.slice(0, 5);

  return (
    <section className="py-12 md:py-20 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2B3F43]">
            Digital Solutions We Have Built
          </h2>
          <p className="mt-3 text-[16px] text-back max-w-3xl mx-auto leading-relaxed">
            We develop web, mobile, and enterprise applications that are designed to be reliable, scalable, and easy to use, helping businesses operate more efficiently and grow with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {visibleProjects.map((project) => (
            <div 
              key={project._id} 
              className="flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
            >
              <div className="w-full flex flex-col h-full">
                {/* Thumbnail Container */}
                <div className="relative h-40 sm:h-44 overflow-hidden bg-slate-50 shrink-0">
                  <img 
                    src={project?.images?.[0]?.url} 
                    alt={project.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Card Content Block */}
                <div className="p-4 sm:p-5 bg-[#2B3F43] flex-grow flex flex-col justify-between text-white">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 line-clamp-2">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Metadata and Link Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                    <span className="text-[11px] text-slate-300 font-medium">
                      {project.startingDate}
                    </span>
                    <span className="text-xs sm:text-[13px] font-semibold text-white flex items-center gap-1">
                      View Project <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* "View All Projects" Link Card */}
          <Link 
            to="/projects" 
            className="rounded-2xl bg-[#2B3F43] flex items-center justify-center min-h-[250px] sm:min-h-[280px] shadow-sm p-6 text-center"
          >
            <div className="flex text-white gap-2 justify-center items-center">
              <h3 className="text-lg sm:text-xl font-bold mb-1.5">View All </h3> 
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;