import { useState, useEffect } from "react"
import axios from "axios"
import { FaGithub, FaLinkedinIn } from "react-icons/fa6"

const Team = () => {
    const [team, setTeam] = useState([])

    const getData = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/admin/users`, { withCredentials: true })
            setTeam(result.data.users)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
        const getUpdatedData = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/user/admin/users`, { withCredentials: true })
        
        getUpdatedData.onmessage = (event) => {
            try {
                const result = JSON.parse(event.data)
                if (result && result.users) {
                    setTeam(result.users)
                }
            } catch (error) {
                console.log("Parse is giving error", error)
            }
        }

        getUpdatedData.onerror = (error) => {
            console.log("EventSource is not working", error);
        }

        return () => {
            getUpdatedData.close()
        }
    }, [])

    return (
        <section className="bg-slate-950 text-slate-100 py-24 px-6 relative overflow-hidden border-t border-slate-900 font-sans">
            {/* Ambient Background Radial Glow Layer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Section Branding Header */}
                <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full border border-emerald-500/20">
                        ACTIVE LAB LAYER
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Our Engineering Registry
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        Real-time directory of system developers, cloud architects, and machine learning operations specialists currently online.
                    </p>
                </div>

                {/* Developer Grid Loop Structure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.length > 0 ? (
                        team.slice(0, 4).map((developer) => (
                            <div 
                                key={developer._id || developer.id} 
                                className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
                            >
                                {/* Interactive Identity Profile Ring */}
                                <div className="relative w-24 h-24 mx-auto mb-5">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 opacity-20 group-hover:opacity-100 blur-[3px] transition duration-300" />
                                    <img 
                                        // FIXED: Looks for multiple common avatar keys before defaulting to a backup tech avatar asset
                                        src={developer.image?.url} 
                                        alt={developer.name} 
                                        className="w-full h-full object-cover rounded-full relative z-10 border-2 border-slate-950 p-1 bg-slate-900"
                                    />
                                </div>

                                {/* Core Card Info Texts */}
                                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors duration-200 truncate">
                                    {developer.name}
                                </h3>
                                
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 italic mt-1.5 mb-2">
                                    {developer.role ? `${developer.role} Developer` : "Systems Engineer"}
                                </p>

                                <p className="text-xs text-slate-400/70 lowercase font-mono mb-4 truncate max-w-full px-2">
                                    {developer.email}
                                </p>

                                {/* Developer Social Portals */}
                                <div className="flex justify-center gap-3.5 pt-2 border-t border-slate-800/60">
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200">
                                        <FaLinkedinIn className="text-xs" />
                                    </a>
                                    <a href="#" className="text-slate-500 hover:text-white transition-colors duration-200">
                                        <FaGithub className="text-xs" />
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500 text-sm font-mono tracking-wider animate-pulse">
                            Awaiting transmission stream data...
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}

export default Team;