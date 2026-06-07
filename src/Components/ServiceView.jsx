import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Layers, ArrowLeft, Terminal, Cpu, Blocks } from "lucide-react";

const ServiceView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    const getServiceDetails = async () => {
        try {
            const resp = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/service/get/${id}`,
                { withCredentials: true }
            );
            if (resp.data && resp.data.service) {
                setService(resp.data.service);
            }
        } catch (error) {
            console.error("Error fetching individual service context:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getServiceDetails();

        const result = new EventSource(
            `${import.meta.env.VITE_API_URL}/api/v1/service/get/${id}`,
            { withCredentials: true }
        );

        result.onmessage = (event) => {
            try {
                const resp = JSON.parse(event.data);
                if (resp && resp.service) {
                    setService(resp.service);
                }
            } catch (error) {
                console.error("Live view data parse error:", error);
            }
        };

        result.onerror = (error) => {
            console.error("Live streaming connection failed:", error);
        };

        return () => result.close();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-[#2B3F43]/30 border-t-[#2B3F43] rounded-full animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 font-sans text-center">
                <h2 className="text-xl font-bold text-[#2B3F43]">Service Not Found</h2>
                <p className="text-slate-500 text-sm mt-1 max-w-xs">The requested resource could not be reached or has been moved.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-[#2B3F43] text-white text-xs font-bold tracking-wider uppercase rounded-xl transition duration-200 shadow-sm"
                >
                    <ArrowLeft size={14} /> Back to Services
                </button>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-slate-50 text-slate-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased relative overflow-hidden">

            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2B3F43]/5 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-12 left-10 w-[400px] h-[400px] bg-sky-100/40 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">

                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-xs font-bold text-[#2B3F43] tracking-widest uppercase mb-10 opacity-70 hover:opacity-100 transition-opacity duration-200"
                >
                    <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
                    <span>Return</span>
                </button>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                    <div className="md:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(43,63,67,0.015)] space-y-6">

                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-[#2B3F43] text-white shadow-sm">
                                <Layers size={20} />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold tracking-[0.25em] text-[#2B3F43] uppercase opacity-60 block">
                                    Service Specifications
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#2B3F43] mt-0.5">
                                    {service.title}
                                </h1>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-wrap">
                                {service.description}
                            </p>
                        </div>

                        {service.tags && service.tags.length > 0 && (
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-[10px] font-bold text-[#2B3F43] uppercase tracking-wider opacity-50 mb-3">Covered Technologies & Paradigms</h4>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200 rounded-md uppercase tracking-wider"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="md:col-span-4 bg-[#2B3F43] rounded-2xl p-6 shadow-[0_12px_40px_rgba(43,63,67,0.12)] border border-[#2B3F43] text-white space-y-6">

                        <div className="space-y-2">
                            <h3 className="text-base font-bold tracking-tight text-white">Execution Channel</h3>
                            <p className="text-slate-300 text-xs font-normal leading-relaxed">
                                Ready to integrate this specific setup into your active core product timeline?
                            </p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-white/10 text-white">
                                    <Terminal size={14} />
                                </div>
                                <span className="text-xs text-slate-200 font-semibold">Agile Turnaround</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-white/10 text-white">
                                    <Cpu size={14} />
                                </div>
                                <span className="text-xs text-slate-200 font-semibold">Production Monitored</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-white/10 text-white">
                                    <Blocks size={14} />
                                </div>
                                <span className="text-xs text-slate-200 font-semibold">Clean Architecture</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/contact")}
                            className="w-full mt-2 py-3 px-4 bg-white hover:bg-slate-100 text-[#2B3F43] font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
                        >
                            <span>Initialize Project</span>
                        </button>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default ServiceView;