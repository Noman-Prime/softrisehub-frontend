import React, { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/api/v1/package/findAll`,
        { withCredentials: true }
      );
      setPackages(data.packages || []);
    } catch (error) {
      console.log("❌ PACKAGES ERROR:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-20 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase block mb-3">
          / Pricing Structures
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Our Packages
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
          Select an engineered plan tailored explicitly to match your scale, timeline, and architectural criteria.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <svg className="animate-spin h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Retrieving deployment models...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white max-w-md mx-auto">
            <p className="text-sm font-medium text-slate-500">No active packages are currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.04)] hover:shadow-[0_24px_48px_-10px_rgba(15,23,42,0.06)] hover:border-slate-300 transition duration-200 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="inline-block text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase">
                    {pkg.type}
                  </span>

                  <h2 className="text-xl font-black text-slate-900 tracking-tight mt-4">
                    {pkg.name}
                  </h2>

                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-3xl font-black text-slate-900">${pkg.price}</span>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">/ total</span>
                  </div>

                  <p className="text-sm text-slate-500 mt-4 leading-relaxed font-normal min-h-[48px]">
                    {pkg.details}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-400">Structural Scope</span>
                      <span className="text-slate-700">{pkg.pages} Pages</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-400">Delivery Window</span>
                      <span className="text-slate-700">{pkg.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-400">Iterative Revisions</span>
                      <span className="text-slate-700">{pkg.revision} Cycles</span>
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm transition duration-150 active:scale-[0.99] cursor-pointer">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Packages;