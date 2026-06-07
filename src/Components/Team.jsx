import { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
        console.log("Parse error", error);
      }
    };

    getUpdatedData.onerror = (error) => {
      console.log("EventSource structural break", error);
    };

    return () => getUpdatedData.close();
  }, []);

  return (
    <section className="relative py-12 md:py-20 px-4 sm:px-6 bg-white overflow-hidden border-t border-slate-100 font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2B3F43]">
            Our Engineering Team
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Real-time directory of system developers, cloud architects, and engineering specialists ready to build solutions.
          </p>
        </div>

        {/* Card Layouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Maps exactly 3 user cards */}
          {team.slice(0, 3).map((developer) => {
            const image = developer.image?.url || "/logo.png";
            return (
              <div 
                key={developer._id || developer.id} 
                className="group flex flex-col justify-between border rounded-2xl p-6 text-center bg-[#2B3F43] border-[#2B3F43] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-xl"
              >
                <div className="w-full">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
                    <img 
                      src={image} 
                      alt={developer.firstName || "Developer"} 
                      className="w-full h-full object-cover rounded-full border-2 border-white p-0.5 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-white transition-colors duration-200 truncate px-1">
                    {developer.firstName ? `${developer.firstName} ${developer.lastName || ""}` : developer.name || "Team Member"}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-sky-600 group-hover:text-sky-300 mt-1 mb-1.5 capitalize">
                    {developer.role || "Developer"}
                  </p>
                  <p className="text-xs text-slate-500 group-hover:text-slate-300 font-mono mb-4 truncate max-w-full px-2 transition-colors duration-200">
                    {developer.email}
                  </p>
                </div>

                <div className="flex justify-center gap-4 pt-3 border-t border-slate-200/60 group-hover:border-white/10 mt-auto">
                  <a href="#" className="text-slate-400 group-hover:text-sky-300 hover:scale-110 transition-all duration-200">
                    <FaLinkedinIn className="text-sm" size={20}/>
                  </a>
                  <a href="#" className="text-slate-400 group-hover:text-white hover:scale-110 transition-all duration-200">
                    <FaGithub className="text-sm" size={20}/>
                  </a>
                </div>
              </div>
            );
          })}

          <Link
            to="/team"
            className="group rounded-2xl bg-[#2B3F43] border border-[#2B3F43] flex flex-col items-center justify-center min-h-[250px] sm:min-h-[280px] shadow-sm p-6 text-center hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex flex-col items-center gap-3 text-white">
              <div className="p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                <ArrowRight size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">View All Members</h3>
                <p className="text-xs text-slate-300 mt-1">See our full operational roster</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;