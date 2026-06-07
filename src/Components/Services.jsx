import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const [service, setService] = useState([]);

  const getServices = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/service/get/all`, { withCredentials: true });
      setService(resp.data.service);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    getServices();
    const result = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/service/get/all`, { withCredentials: true });
    
    result.onmessage = (event) => {
      try {
        const resp = JSON.parse(event.data);
        if (resp && resp.service) setService(resp.service);
      } catch (error) {
        console.error("SSE parse error:", error);
      }
    };

    result.onerror = (error) => {
      console.error("EventSource connectivity error:", error);
    };

    return () => result.close();
  }, []);

  return (
    <section className="py-12 md:py-20 bg-white border-t border-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2B3F43] tracking-tight">
            Our Services
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We design and build reliable digital solutions that help businesses grow, automate processes, and scale efficiently.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {service.slice(0, 5).map((data) => (
            <Link
              key={data?._id}
              to={`/service/${data?._id}`}
              className="group flex flex-col justify-between bg-[#2B3F43] rounded-2xl p-6 shadow-sm border border-slate-100/5 text-white hover:shadow-xl hover:-translate-y-1.5 hover:border-white/10 transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Header & Content */}
              <div className="w-full relative">
                {/* Constant Premium Symbol for all Backend Services */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-white/70 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                    <Layers size={18} />
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 tracking-tight group-hover:text-white/90 transition-colors">
                  {data.title}
                </h2>
                <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed mb-6 line-clamp-4 font-normal">
                  {data.description}
                </p>
              </div>

              {/* Tags Section (Clean: without bottom separator lines) */}
              {data?.tags && data.tags.length > 0 && (
                <div className="w-full mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {data.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-bold bg-white/10 text-white/90 rounded-md uppercase tracking-wider border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Link>
          ))}

          {/* "View All Services" Card */}
          <Link
            to="/service"
            className="group rounded-2xl bg-[#2B3F43] border border-white/5 flex flex-col items-center justify-center text-white p-6 text-center hover:-translate-y-1.5 hover:shadow-xl hover:border-white/10 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex flex-col items-center gap-3">
              {/* Animated Icon Wrapper */}
              <div className="p-3.5 bg-white/5 rounded-full border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                <ArrowRight size={22} className="text-white group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">View All Layouts</h3>
                <p className="text-xs text-slate-300/80 mt-0.5">Explore our full ecosystem capabilities</p>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Services;