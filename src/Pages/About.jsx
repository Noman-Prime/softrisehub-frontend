import React from "react";
import { Code2, Layers, Sparkles, Globe, Rocket, ShieldCheck } from "lucide-react";

const About = () => {
  return (
    <section className="relative min-h-screen bg-slate-50 text-slate-900 py-16 md:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Subtle organic light treatment instead of perfect radial glowing circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-sky-100/40 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 left-10 w-[400px] h-[400px] bg-blue-100/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Editorial Layout Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 md:mb-28 items-end">
          <div className="lg:col-span-7">
            <span className="text-blue-600 text-xs font-bold tracking-widest uppercase block mb-3">
              Who We Are
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              We build the software hidden behind your favorite products.
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Every business hits a point where standard tools and templates break. We step in right there—designing custom web platforms, core infrastructure, and tailored integrations engineered to handle your heaviest traffic days smoothly.
            </p>
          </div>
        </div>

        {/* Core Content: Unbalanced 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand Philosophy Narrative */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Our Approach to Code
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We look at software development as craftsmanship. Clean code, deterministic architecture, and careful frontend polish aren't optional add-ons for us—they are the baseline requirements for everything that leaves our shop.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We don’t chase tech buzzwords or force-fit trend frameworks into your ecosystem. We evaluate your active data paths, user loads, and business goals to select the exact stack required to keep your business running smoothly for years.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#vision" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition shadow-sm">
                How We Think
              </a>
              <a href="#process" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-slate-700 border border-slate-200 font-medium text-xs hover:bg-slate-50 transition shadow-sm">
                See Our Process
              </a>
            </div>
          </div>

          {/* Grid Layout with alternating heights to break up symmetry */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-4">
              <Card 
                icon={<Code2 size={20} />} 
                title="Pragmatic Engineering" 
                description="We favor reliable, well-documented type systems over fragile experimental tech, minimizing tech debt from day one." 
              />
              <Card 
                icon={<Layers size={20} />} 
                title="Solid Architecture" 
                description="Systems engineered cleanly with modular separation, so your platform can evolve without requiring a complete rewrite." 
              />
              <Card 
                icon={<Sparkles size={20} />} 
                title="Intentional UI/UX" 
                description="Interfaces built specifically around real human behavior, swapping confusing layouts for clear, simple workflows." 
              />
            </div>
            
            <div className="space-y-4 sm:mt-8">
              <Card 
                icon={<Globe size={20} />} 
                title="Deterministic Deployments" 
                description="Automated build setups and production check pipelines that catch bugs long before your users ever see them." 
              />
              <Card 
                icon={<Rocket size={20} />} 
                title="Measured Scaling" 
                description="Database optimization and smart caching designed to scale horizontally as your transaction volumes grow." 
              />
              <Card 
                icon={<ShieldCheck size={20} />} 
                title="Pragmatic Security" 
                description="Sensible data encryption, strict access configurations, and protective testing protocols applied at every level." 
              />
            </div>
          </div>
        </div>

        {/* Minimalist Stats Panel */}
        <div className="mt-24 pt-12 border-t border-slate-200 grid grid-cols-2 md:grid-cols-3 gap-8 text-left">
          <div>
            <span className="block text-4xl font-black text-slate-900 tracking-tight">50+</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Systems shipped and live in production</span>
          </div>
          <div>
            <span className="block text-4xl font-black text-blue-600 tracking-tight">99.9%</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Average runtime platform uptime</span>
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="block text-4xl font-black text-slate-900 tracking-tight">100%</span>
            <span className="text-xs text-slate-500 font-medium mt-1 block">Transparent, collaborative code delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
};

const Card = ({ icon, title, description }) => (
  <div className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col items-start">
    <div className="text-blue-600 mb-4 bg-blue-50 p-2.5 rounded-xl">
      {icon}
    </div>
    <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1.5">{title}</h3>
    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{description}</p>
  </div>
);

export default About;