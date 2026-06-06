import React, { useState, useEffect } from "react";
import axios from "axios";

const ServicePage = () => {
  const [service, setService] = useState([]);

  const getServices = async () => {
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/service/get/all`,
        { withCredentials: true }
      );
      setService(resp.data.service);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getServices();
    
    const result = new EventSource(
      `${import.meta.env.VITE_API_URL}/api/v1/service/get/all`,
      { withCredentials: true }
    );

    result.onmessage = (event) => {
      try {
        const resp = JSON.parse(event.data);
        if (resp && resp.service) {
          setService(resp.service);
        }
      } catch (error) {
        console.log(error);
      }
    };

    result.onerror = (error) => {
      console.log("EventSource error", error);
    };

    return () => {
      result.close();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="w-full max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            / Capabilities
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Services
          </h1>
          <p className="mt-3 text-slate-500 text-sm sm:text-base leading-relaxed">
            We design and build reliable digital solutions that help businesses grow, automate processes, and scale efficiently.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {service.map((data) => (
            <div
              key={data?._id}
              className="w-full min-w-0 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:border-slate-300 transition duration-150"
            >
              <div className="w-full min-w-0">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-3 truncate">
                  {data.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-normal mb-6 break-words">
                  {data.description}
                </p>
              </div>

              <div className="w-full pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {data.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide bg-slate-50 text-slate-600 border border-slate-200 rounded-md whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ServicePage;