import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Toplans = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-sky-50/40 to-white overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-sky-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200/30 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="relative rounded-3xl border border-sky-100 bg-white shadow-sm p-10 md:p-16 text-center">

          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-white opacity-80" />

          <div className="relative">

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Turn your idea into a{" "}
              <span className="text-sky-600">
                real product
              </span>
            </h2>

            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              From concept to launch, we help businesses build fast, scalable,
              and reliable digital products designed for real users and long-term growth.
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/packages")}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Sparkles size={18} />
                Explore Packages
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="mt-8 text-xs text-slate-500 tracking-widest uppercase">
              Built for startups, founders, and growing businesses
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Toplans;