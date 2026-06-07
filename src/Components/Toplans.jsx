import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Toplans = () => {
  const navigate = useNavigate();

  return (
    /* VARIATION: Soft, modern light background with clear brand focus */
    <section className="relative py-12 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white via-sky-50/50 to-white overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 bg-sky-200/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        {/* CARD ACCENT: The container is built completely out of your Navbar theme color (#2B3F43) */}
        <div className="relative rounded-2xl bg-[#2B3F43] shadow-xl p-6 sm:p-10 md:p-14 text-center overflow-hidden">
          {/* Subtle light inner splash glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-60 pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 sm:mb-5 tracking-tight">
              Turn your idea into a{" "}
              <span className="text-sky-300 block sm:inline">real product</span>
            </h2>
            
            <p className="text-slate-200/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              From concept to launch, we help businesses build fast, scalable, and reliable digital products designed for real users and long-term growth.
            </p>
            
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/packages")}
                /* Clean contrast bright CTA button */
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm sm:text-base font-semibold shadow-lg shadow-sky-400/10 hover:shadow-sky-400/20 hover:-translate-y-1 transition-all duration-300"
              >
                <Sparkles size={16} />
                Explore Packages
                <ArrowRight size={16} className="group-hover:translate-x-1 transition duration-300" />
              </button>
            </div>
            
            <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-sky-300/80 font-bold tracking-[2px] uppercase px-2">
              Built for startups, founders, and growing businesses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toplans;