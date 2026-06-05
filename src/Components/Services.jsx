import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Services = () => {
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
    )
    result.onmessage = (event) => {
      try {
        const resp = JSON.parse(event.data)
        if (resp && resp.service) {
          setService(resp.service)
        }
      } catch (error) {
        console.log(error);
      }
    }
    result.onerror = (error) => {
      console.log("EventScource is not working", error);
    }
    return (close) => {
      result.close()
    }
  }, []);

  return (
    <div className="relative py-24 px-6 bg-gradient-to-b from-white via-sky-50/40 to-white text-slate-900 overflow-hidden">
      <div className="absolute top-20 left-20 w-72 h-72 bg-sky-200/30 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200/30 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Our Services
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We design and build reliable digital solutions that help businesses grow, automate processes, and scale efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {service.slice(0, 5).map((data) => (
            <div
              key={data?._id}
              className="group bg-white border border-sky-100 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100 hover:border-sky-300 hover:-translate-y-2 transition-all duration-500"
            >
              <h2 className="text-xl font-bold mb-3 group-hover:text-sky-600 transition">
                {data.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {data.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {data.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-sky-50 text-sky-700 rounded-lg border border-sky-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <Link
            to="/service"
            className="group rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white min-h-[320px] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="text-center px-6">
              <h3 className="text-2xl font-bold mb-3">
                View All Services
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Explore our complete range of digital services designed for modern businesses.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Services;