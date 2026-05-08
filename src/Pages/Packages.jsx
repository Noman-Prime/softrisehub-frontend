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

      console.log("📦 PACKAGES RESPONSE:", data);

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
    <div className="min-h-screen bg-[#050814] text-white p-8">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-sky-400">
          Our Packages
        </h1>
        <p className="text-white/50 mt-2">
          Choose the perfect plan for your needs
        </p>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-white/50">
          Loading packages...
        </p>
      ) : packages.length === 0 ? (
        <p className="text-center text-white/50">
          No packages available
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-sky-500 transition"
            >

              {/* TYPE */}
              <p className="text-xs text-sky-400 font-bold uppercase">
                {pkg.type}
              </p>

              {/* NAME */}
              <h2 className="text-xl font-bold mt-2">
                {pkg.name}
              </h2>

              {/* PRICE */}
              <p className="text-2xl font-bold text-sky-400 mt-2">
                ${pkg.price}
              </p>

              {/* DETAILS */}
              <p className="text-sm text-white/60 mt-3">
                {pkg.details}
              </p>

              {/* FEATURES */}
              <div className="mt-4 text-xs text-white/50 space-y-1">
                <p>📄 Pages: {pkg.pages}</p>
                <p>⏱ Timeline: {pkg.timeline}</p>
                <p>🔁 Revisions: {pkg.revision}</p>
              </div>

              {/* BUTTON */}
              <button className="mt-6 w-full py-2 rounded-xl bg-sky-500 text-black font-semibold hover:bg-sky-400 transition">
                Select Plan
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Packages;