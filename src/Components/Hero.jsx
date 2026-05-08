import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-[#020617] pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="flex-1 text-center lg:text-left">

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
                System Operational
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Infrastructure built for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                modern engineering
              </span>
            </h1>

            <p className="mt-8 text-slate-400 text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              A high-performance platform designed for scalable systems, automated workflows, and global deployment consistency across all environments.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white font-semibold text-sm">Global Edge Infrastructure</p>
                <p className="text-slate-500 text-xs mt-1">Deploy instantly worldwide</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white font-semibold text-sm">Scalable Systems</p>
                <p className="text-slate-500 text-xs mt-1">From startup to enterprise</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white font-semibold text-sm">Secure by Design</p>
                <p className="text-slate-500 text-xs mt-1">Modern security standards</p>
              </div>

            </div>

          </div>

          <div className="flex-1 w-full max-w-[600px]">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-blue-600 blur-2xl opacity-20 rounded-2xl"></div>

              <div className="relative bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-10">

                <div className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-6">
                  Platform Architecture
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Built for scalable production systems
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  SoftRiseHub provides a modern foundation for building fast, reliable, and scalable digital products.
                </p>

                <div className="space-y-4">

                  <div className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="text-white text-sm font-semibold">Edge Deployment</p>
                      <p className="text-slate-500 text-xs">Low latency global delivery</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-white text-sm font-semibold">Backend Scaling</p>
                      <p className="text-slate-500 text-xs">Handles high traffic workloads</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="text-white text-sm font-semibold">Secure Infrastructure</p>
                      <p className="text-slate-500 text-xs">Built with security-first approach</p>
                    </div>
                  </div>

                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <p className="text-xs text-slate-500">
                    Trusted by developers building modern SaaS products worldwide.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;