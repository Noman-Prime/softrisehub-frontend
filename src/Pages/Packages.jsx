import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const fetchPackages = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/package/findAll`, { withCredentials: true });
      setPackages(data.packages || []);
    } catch (error) {
      console.error("❌ PACKAGES ERROR:", error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/90 py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2B3F43] tracking-tight">
          Our Packages
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
          Transparent, engineered pricing structures built to match your development scope and launch timeline.
        </p>
      </div>

      {/* Grid Container - Direct mapping of all elements with perfectly consistent layouts */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch auto-rows-fr">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="flex flex-col justify-between bg-[#2B3F43] rounded-2xl p-6 sm:p-8 text-white border border-slate-100/5 shadow-md h-full relative overflow-hidden"
          >
            <div>
              {/* Category Type Header Line */}
              <span className="inline-block text-[10px] font-bold tracking-wider text-white bg-white/10 border border-white/10 px-2.5 py-1 rounded-md uppercase">
                {pkg.type}
              </span>

              {/* Plan Name */}
              <h2 className="text-xl font-bold tracking-tight text-white mt-4">
                {pkg.name}
              </h2> 

              {/* Pricing Value Row */}
              <div className="flex items-baseline gap-1 mt-3">
                <span className="text-3xl font-extrabold text-white">${pkg.price}</span>
                <span className="text-xs font-medium text-white/70 uppercase tracking-wider">/ total</span>
              </div>

              {/* Summary Text Box */}
              <p className="text-xs sm:text-[13px] text-white/90 mt-4 leading-relaxed font-normal min-h-[48px] line-clamp-3">
                {pkg.details}
              </p>

              {/* Operational Features Roster */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 size={14} className="text-white" />
                    Structural Scope
                  </span>
                  <span className="font-semibold text-white">{pkg.pages} Pages</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 size={14} className="text-white" />
                    Delivery Window
                  </span>
                  <span className="font-semibold text-white">{pkg.timeline}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="flex items-center gap-2 text-white/80">
                    <CheckCircle2 size={14} className="text-white" />
                    Iterative Revisions
                  </span>
                  <span className="font-semibold text-white">{pkg.revision} Cycles</span>
                </div>
              </div>
            </div>

            {/* Custom Interactive Button (White -> Black on Hover) */}
            <button className="mt-8 w-full py-3.5 bg-white text-black hover:bg-black hover:text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-sm transition-all duration-300 active:scale-95 cursor-pointer border border-transparent">
              Select Plan
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Packages;