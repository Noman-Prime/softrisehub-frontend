import React from "react";

const Services = () => {
  const services = [
    {
      title: "Web Development",
      desc: "High-performance React applications built with scalability and lightning-fast load times.",
      icon: "🌐",
      accent: "from-blue-500/20 to-cyan-400/20",
      glow: "group-hover:shadow-blue-500/20"
    },
    {
      title: "AI & Machine Learning",
      desc: "Custom neural networks and intelligent systems that turn your data into decisions.",
      icon: "🤖",
      accent: "from-indigo-500/20 to-blue-500/20",
      glow: "group-hover:shadow-indigo-500/20"
    },
    {
      title: "UI/UX Design",
      desc: "Clean, conversion-focused interfaces built for clarity, usability, and brand impact.",
      icon: "🎨",
      accent: "from-purple-500/20 to-indigo-500/20",
      glow: "group-hover:shadow-purple-500/20"
    }
  ];

  return (
    <section className="relative py-28 bg-[#0B0F19] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-blue-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Our Expertise
          </h2>

          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Powerful Solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Modern SaaS
            </span>
          </h3>

          <p className="text-gray-400 text-lg">
            We blend engineering and design to create scalable, high-impact digital products.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-[1px] rounded-3xl bg-gradient-to-br ${service.accent}`}
            >
              {/* Glass Card */}
              <div className={`h-full bg-[#111827]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/5 transition-all duration-500 shadow-xl ${service.glow} hover:-translate-y-2`}>
                
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center text-2xl rounded-xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* Learn More */}
                <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm font-medium opacity-70 group-hover:opacity-100 transition">
                  Learn more
                  <span className="group-hover:translate-x-1 transition">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;