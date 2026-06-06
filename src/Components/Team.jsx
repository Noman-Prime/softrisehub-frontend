import { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

const Team = () => {
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
        console.log("Parse is giving error", error);
      }
    };

    getUpdatedData.onerror = (error) => {
      console.log("EventSource is not working", error);
    };

    return () => getUpdatedData.close();
  }, []);

  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 overflow-hidden border-t border-slate-100 font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-sky-200/20 blur-[100px] md:blur-[160px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20 space-y-3 md:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-wider text-blue-600 bg-blue-50 rounded-full border border-blue-100">
            ACTIVE REGISTRY
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Our Engineering Team
          </h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            Real-time directory of system developers, cloud architects, and engineering specialists ready to build solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.length > 0 ? (
            team.slice(0, 4).map((developer) => {
              const image = developer.image?.url || "/logo.png";
              return (
                <div 
                  key={developer._id || developer.id} 
                  className="group bg-white border border-sky-100 rounded-3xl p-6 text-center hover:shadow-xl hover:shadow-sky-100/60 hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden shadow-sm"
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 opacity-0 group-hover:opacity-100 blur-[2px] transition duration-300" />
                    <img 
                      src={image} 
                      alt={developer.firstName || "Developer"} 
                      className="w-full h-full object-cover rounded-full relative z-10 border-2 border-white p-0.5 bg-slate-50 transition-transform duration-300 group-hover:scale-102"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200 truncate px-1">
                    {developer.firstName ? `${developer.firstName} ${developer.lastName || ""}` : developer.name || "Team Member"}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-1 mb-2 capitalize">
                    {developer.role || "Developer"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-mono mb-4 truncate max-w-full px-2">
                    {developer.email}
                  </p>
                  <div className="flex justify-center gap-4 pt-3 border-t border-slate-100">
                    <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors duration-200">
                      <FaLinkedinIn className="text-sm" />
                    </a>
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors duration-200">
                      <FaGithub className="text-sm" />
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400 text-xs sm:text-sm font-mono tracking-wider animate-pulse">
              Loading stream transmission updates...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;