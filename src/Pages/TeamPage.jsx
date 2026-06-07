import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "lucide-react";
import Footer from "../Components/Footer";

const TeamPage = () => {
    const [team, setTeam] = useState([]);

    const getData = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/admin/users`, { withCredentials: true });
            setTeam(result.data.users);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
        const getUpdatedData = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/user/admin/users`, { withCredentials: true });

        getUpdatedData.onmessage = (event) => {
            try {
                const result = JSON.parse(event.data);
                if (result && result.users) setTeam(result.users);
            } catch (error) {
                console.log("Parse error", error);
            }
        };

        getUpdatedData.onerror = (error) => {
            console.log("EventSource structural break", error);
        };

        return () => getUpdatedData.close();
    }, []);

    // Filter out administration profiles (admin/owner) for privacy and protection
    const publicEngineers = team.filter((developer) => {
        const role = (developer?.role || "").toLowerCase();
        return role !== "admin" && role !== "owner";
    });

    return (
        <>
        <section className="relative py-12 md:py-20 px-4 sm:px-6 bg-white overflow-hidden border-t border-slate-100 font-sans">
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2B3F43]">
                        Our Engineering Team
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Real-time directory of verified core developers and technical specialists executing operations.
                    </p>
                </div>

                {/* Card Layouts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {publicEngineers.map((developer) => {
                        const hasImage = developer.image?.url;
                        
                        // Extract initials safely from firstName and lastName
                        const fInitial = developer.firstName ? developer.firstName.charAt(0).toUpperCase() : "";
                        const lInitial = developer.lastName ? developer.lastName.charAt(0).toUpperCase() : "";
                        const initials = fInitial || lInitial ? `${fInitial}${lInitial}` : (developer.name ? developer.name.charAt(0).toUpperCase() : "T");

                        return (
                            <div
                                key={developer._id || developer.id}
                                className="group flex flex-col justify-between border rounded-2xl p-6 text-center bg-[#2B3F43] border-[#2B3F43] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl min-h-[280px] sm:min-h-[320px]"
                            >
                                <div className="w-full my-auto">
                                    {/* Upgraded Image Container Matrix Size to w-36 h-36 */}
                                    <div className="relative w-36 h-36 mx-auto mb-6">
                                        {hasImage ? (
                                            <img
                                                src={developer.image.url}
                                                alt={developer.firstName || "Developer"}
                                                className="w-full h-full object-cover rounded-full border-2 border-white/20 p-0.5 bg-white/5 shadow-sm transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full border-2 border-white/20 bg-white/10 text-white flex items-center justify-center text-3xl font-black tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 select-none">
                                                {initials}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-base font-bold text-white tracking-tight truncate px-1">
                                        {developer.firstName ? `${developer.firstName} ${developer.lastName || ""}` : developer.name || "Team Member"}
                                    </h3>
                                    
                                    <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                                        <User size={12} className="text-sky-300" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 capitalize">
                                            {developer.role || "Developer"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
        <Footer />
        </>
    );
};

export default TeamPage;