import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";

const FinalCTA = () => {
    const navigate = useNavigate();

    return (
        <section className="relative py-32 bg-[#0B0F19] overflow-hidden">

            <div className="absolute inset-0">
                <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] rounded-full"></div>
                <div className="absolute bottom-[-200px] right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[160px] rounded-full"></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-14 md:p-20 text-center overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-60"></div>

                    <div className="relative z-10">

                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                            Turn your idea into a
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                {" "}real product
                            </span>
                        </h2>

                        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                            From concept to launch, we help you build digital products that are fast,
                            scalable, and ready for real users — without the complexity.
                        </p>

                        <div className="flex justify-center">

                            <button
                                onClick={() => navigate("/packages")}
                                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-xl hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300"
                            >
                                <Sparkles size={18} />
                                Explore Packages
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />

                                <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-20 transition"></span>
                            </button>

                        </div>

                        <div className="mt-10 text-xs text-slate-500 tracking-widest uppercase">
                            Built for startups, founders, and growing businesses
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default FinalCTA;