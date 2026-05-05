import React from "react";
import { ArrowRight, Terminal, Cpu, Globe } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-[#020617] pt-24 pb-20 lg:pt-32 lg:pb-40 overflow-hidden">
      {/* High-Performance Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        
        {/* Subtle Neon Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Terminal-Style Badge */}
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-emerald-500 text-[11px] font-mono font-bold tracking-widest uppercase">
                System Status: Optimized
              </span>
            </div>

            <h1 className="text-5xl md:text-[5rem] font-bold text-white tracking-tight leading-[1] mb-8">
              The OS for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Modern Engineering.
              </span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Ship resilient infrastructure with a platform designed for scale. 
              Zero-config deployments, automated security, and global edge delivery.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
                Deploy Now <ArrowRight size={18} />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 text-white font-semibold rounded-xl border border-slate-800 hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Terminal size={18} className="text-emerald-500" /> Read Docs
              </button>
            </div>
          </div>

          {/* Right Side: The "Core Engine" Visual */}
          <div className="flex-1 w-full max-w-[600px]">
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              
              {/* The "Main Frame" */}
              <div className="relative bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/30">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global_Instance_01</div>
                </div>

                {/* Content Area */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Performance Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'CPU', val: '12%', icon: <Cpu size={14}/> },
                        { label: 'Uptime', val: '99.9%', icon: <Globe size={14}/> },
                        { label: 'Load', val: '0.04', icon: <Terminal size={14}/> }
                      ].map((stat, i) => (
                        <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-xl">
                          <div className="text-slate-500 mb-1">{stat.icon}</div>
                          <div className="text-xs font-bold text-white">{stat.val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Animated Code/Log Lines */}
                    <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] space-y-2 border border-slate-800">
                      <div className="flex gap-3 text-emerald-500">
                        <span>[12:00:01]</span>
                        <span className="text-white">Initializing edge_worker...</span>
                      </div>
                      <div className="flex gap-3 text-blue-400">
                        <span>[12:00:03]</span>
                        <span className="text-slate-400">Routing traffic to /us-east-1</span>
                      </div>
                      <div className="flex gap-3 text-emerald-500/50">
                        <span>[12:00:05]</span>
                        <span className="text-slate-500">Success: Handshake complete.</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-mono text-slate-500">
                         <span>DEPLOYMENT PROGRESS</span>
                         <span>88%</span>
                       </div>
                       <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full w-[88%] bg-gradient-to-r from-emerald-500 to-blue-500 shadow-[0_0_10px_#10b981]"></div>
                       </div>
                    </div>
                  </div>
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