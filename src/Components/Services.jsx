import React from "react";
import {
  Globe,
  Code2,
  Brain,
  LayoutDashboard,
  ShieldCheck,
  Cloud,
  Database,
  Smartphone
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Full-Stack Web Development",
      desc: "Scalable React + Node.js architectures built for high traffic and production environments.",
      icon: <Code2 />,
      accent: "from-blue-500/20 to-cyan-400/20"
    },
    {
      title: "AI & Intelligent Systems",
      desc: "Custom AI solutions, automation pipelines, and machine learning integrations for modern products.",
      icon: <Brain />,
      accent: "from-indigo-500/20 to-blue-500/20"
    },
    {
      title: "Cloud Infrastructure",
      desc: "Deploy scalable systems on cloud platforms with CI/CD, monitoring, and high availability.",
      icon: <Cloud />,
      accent: "from-emerald-500/20 to-blue-500/20"
    },
    {
      title: "UI/UX Engineering",
      desc: "High-conversion interfaces designed with usability, accessibility, and modern design systems.",
      icon: <LayoutDashboard />,
      accent: "from-purple-500/20 to-indigo-500/20"
    },
    {
      title: "Database Architecture",
      desc: "Optimized SQL/NoSQL schemas ensuring performance, scalability, and data integrity.",
      icon: <Database />,
      accent: "from-yellow-500/20 to-orange-400/20"
    },
    {
      title: "Cybersecurity Systems",
      desc: "Secure authentication, authorization, and protection layers for enterprise-grade applications.",
      icon: <ShieldCheck />,
      accent: "from-red-500/20 to-pink-500/20"
    }
  ];

  return (
    <section className="relative py-28 bg-[#0B0F19] overflow-hidden">

      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 blur-[140px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-20">

          <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Engineering Solutions<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Modern Digital Systems
            </span>
          </h3>

          <p className="text-gray-400 text-lg">
            We build scalable, secure, and production-ready software systems for startups and enterprises.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-[1px] rounded-3xl bg-gradient-to-br ${service.accent}`}
            >

              <div className="h-full bg-[#111827]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-blue-400 mb-6 group-hover:scale-110 transition">
                  {service.icon}
                </div>

                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>

                <div className="mt-6 text-sm font-medium text-blue-400 opacity-70 group-hover:opacity-100 flex items-center gap-1">
                  Explore service <span className="group-hover:translate-x-1 transition">→</span>
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