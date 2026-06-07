import React, { useEffect, useState } from "react";
import { Code2, Layers, Sparkles, Globe, Rocket, ShieldCheck, HelpCircle } from "lucide-react";
import Footer from "../Components/Footer";

// INDUSTRY-STANDARD PRODUCTION SCHEMA
const CORE_CAPABILITIES_DATA = [
  { 
    _id: "cap_01", 
    category: "Engineering Philosophy", 
    iconName: "Code2", 
    title: "Pragmatic Type-Safe Engineering", 
    description: "We mandate strict compile-time safety and self-documenting architectures over experimental runtimes, systematically eradicating systemic technical debt before your first production build." 
  },
  { 
    _id: "cap_02", 
    category: "Engineering Philosophy", 
    iconName: "Layers", 
    title: "Decoupled Event-Driven Topologies", 
    description: "Our systems leverage clear boundary contexts and asynchronous message patterns, ensuring your core services scale horizontally without mutating into an unmaintainable monolith." 
  },
  { 
    _id: "cap_03", 
    category: "Engineering Philosophy", 
    iconName: "Sparkles", 
    title: "High-Cognition UX Workflows", 
    description: "We replace convoluted dashboards with high-density, intent-driven workflows structured precisely around real telemetry data and predictable user mental models." 
  },
  { 
    _id: "cap_04", 
    category: "Infrastructure & Operations", 
    iconName: "Globe", 
    title: "Deterministic Blue/Green Pipelines", 
    description: "Fully declarative Infrastructure as Code (IaC) paired with exhaustive integration test suites that intercept drift and regressions long before reaching multi-region production lines." 
  },
  { 
    _id: "cap_05", 
    category: "Infrastructure & Operations", 
    iconName: "Rocket", 
    title: "Low-Latency High-Throughput Scaling", 
    description: "Architected around intelligent connection pooling, read-replicas, and strategic distributed caching rings engineered to sustain volatile traffic spikes without degradation." 
  },
  { 
    _id: "cap_06", 
    category: "Infrastructure & Operations", 
    iconName: "ShieldCheck", 
    title: "Zero-Trust Security & Compliance", 
    description: "Applying envelope encryption, principle-of-least-privilege RBAC, and systematic static/dynamic application security testing directly inside your continuous deployment sequence." 
  }
];

const iconMap = {
  Code2: <Code2 className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />
};

const About = () => {
  const [capabilities, setCapabilities] = useState([]);

  useEffect(() => {
    setCapabilities(CORE_CAPABILITIES_DATA);
  }, []);

  const categories = [...new Set(capabilities.map(item => item.category))];

  return (
    <>
    <section className="min-h-screen bg-slate-50 py-24 lg:py-36 px-4 sm:px-6 lg:px-8 font-sans text-slate-900 relative overflow-hidden antialiased">
      
      {/* High-End Ambient Gradient Fields */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/[0.03] blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-sky-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Heading Structure */}
        <div className="max-w-4xl mb-28 lg:mb-36">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-[#2B3F43]" />
            <span className="text-xs font-semibold tracking-[0.25em] text-[#2B3F43] uppercase">
              Core Capabilities
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2B3F43] leading-[1.1] max-w-3xl">
            We build the mission-critical software powering your favorite applications.
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl mt-6 leading-relaxed max-w-2xl font-light">
            When standard frameworks, templates, and boilerplate infrastructure reach their breaking point, we step in. We design resilient custom distributed networks and core data layers built to absorb massive operational scale.
          </p>
        </div>

        {/* Segmented Architecture Capabilities Flow */}
        <div className="space-y-28 lg:space-y-36">
          {categories.map((category) => {
            const filteredItems = capabilities.filter(item => item.category === category);

            return (
              <div key={category} className="space-y-12">
                
                {/* Structural Section Header */}
                <div className="border-t border-slate-200 pt-8 flex items-baseline justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#2B3F43] tracking-tight">
                    {category}
                  </h2>
                  <span className="text-xs text-slate-400 font-mono tracking-wider bg-slate-100 px-2.5 py-1 rounded">
                    PROT_0{filteredItems.length}
                  </span>
                </div>

                {/* Highly Scannable Dynamic Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {filteredItems.map((item) => (
                    <CapabilityCard key={item._id} item={item} />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Verified Enterprise Infrastructure Metrics */}
        <div className="mt-36 pt-16 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-left">
          <div className="space-y-2">
            <span className="block text-5xl lg:text-6xl font-extrabold text-[#2B3F43] tracking-tight">50+</span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest block">Distributed Ecosystems Live</span>
          </div>
          <div className="space-y-2">
            <span className="block text-5xl lg:text-6xl font-extrabold text-[#2B3F43] tracking-tight">99.99%</span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest block">Core Runtime SLA Maintained</span>
          </div>
          <div className="col-span-1 sm:col-span-2 md:col-span-1 space-y-2">
            <span className="block text-5xl lg:text-6xl font-extrabold text-[#2B3F43] tracking-tight">100%</span>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest block">IP Ownership Transfer</span>
          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
};
/* Micro-Engineered Brand Colored Card Framework */
const CapabilityCard = ({ item }) => (
  <div className="group p-8 rounded-2xl bg-[#2B3F43] border border-white/[0.03] shadow-[0_4px_20px_-4px_rgba(43,63,67,0.12)] flex flex-col justify-between items-start transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(43,63,67,0.3)] relative overflow-hidden h-full min-h-[260px]">
    
    {/* Subtle inner gradient shift on card hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <div className="w-full relative z-10 flex flex-col h-full justify-between">
      <div>
        {/* Icon Capsule - White styled for dark background container */}
        <div className="text-white mb-6 bg-white/5 border border-white/10 p-3 rounded-xl inline-block transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-105">
          {iconMap[item.iconName] || <HelpCircle className="w-5 h-5" />}
        </div>
        
        {/* Card Header Typography */}
        <h3 className="text-lg font-bold text-white tracking-tight mb-3">
          {item.title}
        </h3>
        
        {/* Balanced Copy Body with proper text-white contrast */}
        <p className="text-sm text-white/70 group-hover:text-white/80 leading-relaxed font-normal transition-colors duration-200">
          {item.description}
        </p>
      </div>
    </div>
  </div>
);

export default About;