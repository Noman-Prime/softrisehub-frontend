import React from "react";
import { Code2, Layers, Sparkles, Globe, Rocket, ShieldCheck } from "lucide-react";

const About = () => {
    return (
        <section className="min-h-screen bg-[#050814] text-white relative overflow-hidden py-24 px-6">

            <div className="absolute inset-0">
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[180px] rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                <div className="text-center mb-16">

                    <p className="text-blue-400 text-[11px] tracking-[0.35em] uppercase font-semibold mb-4">
                        About Us
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
                        We build digital systems that scale
                    </h1>

                    <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
                        We focus on designing and developing modern web platforms, SaaS systems,
                        and AI-powered solutions that help businesses operate efficiently and grow faster.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <div className="space-y-5">

                        <h2 className="text-2xl font-semibold text-white">
                            What we do
                        </h2>

                        <p className="text-white/50 text-sm leading-relaxed">
                            Our work revolves around creating clean, scalable, and maintainable digital products.
                            From backend architecture to frontend experiences, every system is designed with performance and clarity in mind.
                        </p>

                        <p className="text-white/50 text-sm leading-relaxed">
                            We don’t just build websites — we build platforms that handle real users,
                            real data, and real business workflows.
                        </p>

                        <div className="flex gap-3 pt-3">
                            <button className="px-5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                                Our Vision
                            </button>

                            <button className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm">
                                Our Process
                            </button>
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <Card icon={<Code2 />} title="Development" />
                        <Card icon={<Layers />} title="Architecture" />
                        <Card icon={<Sparkles />} title="UI/UX" />
                        <Card icon={<Globe />} title="Deployment" />
                        <Card icon={<Rocket />} title="Scaling" />
                        <Card icon={<ShieldCheck />} title="Security" />

                    </div>

                </div>

                <div className="mt-20 grid md:grid-cols-3 gap-6">

                    <Stat number="50+" label="Projects Built" />
                    <Stat number="10+" label="Active Systems" />
                    <Stat number="100%" label="Client Focus" />

                </div>

            </div>
        </section>
    );
};

const Card = ({ icon, title }) => (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition hover:-translate-y-1">
        <div className="text-blue-400 mb-3">
            {icon}
        </div>
        <p className="text-sm font-medium">{title}</p>
    </div>
);

const Stat = ({ number, label }) => (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{number}</h3>
        <p className="text-white/40 text-xs tracking-widest uppercase">{label}</p>
    </div>
);

export default About;