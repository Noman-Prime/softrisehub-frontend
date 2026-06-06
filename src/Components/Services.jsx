import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
  const [service, setService] = useState([]);

  const getServices = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/service/get/all`, { withCredentials: true });
      setService(resp.data.service);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
    const result = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/service/get/all`, { withCredentials: true });
    result.onmessage = (event) => {
      try {
        const resp = JSON.parse(event.data);
        if (resp && resp.service) setService(resp.service);
      } catch (error) {
        console.log(error);
      }
    };
    result.onerror = (error) => {
      console.log("EventScource is not working", error);
    };
    return () => result.close();
  }, []);

  return (
    <section className="relative py-12 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 md:w-72 md:h-72 bg-sky-200/30 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-48 h-48 md:w-72 md:h-72 bg-blue-200/30 blur-[80px] md:blur-[120px] rounded-full" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Our Services</h1>
          <p className="mt-3 md:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">We design and build reliable digital solutions that help businesses grow, automate processes, and scale efficiently.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {service.slice(0, 5).map((data) => (
            <div key={data?._id} className="group flex flex-col justify-between bg-white border border-sky-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100 hover:border-sky-300 hover:-translate-y-2 transition-all duration-500">
              <div className="w-full">
                <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-sky-600 transition line-clamp-2">{data.title}</h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-4">{data.description}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 mt-auto">
                {data?.tags?.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-sky-50 text-sky-700 rounded-lg border border-sky-100 capitalize">{tag}</span>
                ))}
              </div>
            </div>
          ))}
          <Link to="/service" className="group rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white min-h-[280px] sm:min-h-[320px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="text-center px-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">View All Services</h3>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">Explore our complete range of digital services designed for modern businesses.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;