import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Toplans = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-sky-50/40 to-white overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 bg-sky-200/30 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-48 h-48 md:w-72 md:h-72 bg-blue-200/30 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="max-w-5xl mx-auto relative">
        <div className="relative rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-100/40 p-6 sm:p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-white opacity-80" />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4 sm:mb-6 tracking-tight">
              Turn your idea into a{" "}
              <span className="text-blue-600 block sm:inline">real product</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              From concept to launch, we help businesses build fast, scalable, and reliable digital products designed for real users and long-term growth.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/packages")}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Sparkles size={18} />
                Explore Packages
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </div>
            <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs text-slate-400 font-bold tracking-[2px] uppercase px-2">
              Built for startups, founders, and growing businesses
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Toplans;