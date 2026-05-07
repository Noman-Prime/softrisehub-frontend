import React, { useEffect, useState } from "react";
import axios from "axios";

const Packages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPackages = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/package/findAll`,
                { withCredentials: true }
            );

            setPackages(data.packages || []);
        } catch (error) {
            console.log("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white p-8">

            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-sky-400">
                    Choose Your Package
                </h1>
                <p className="text-slate-400 mt-2">
                    Select the perfect plan for your project
                </p>
            </div>

            {/* Loading */}
            {loading ? (
                <p className="text-center text-slate-400">
                    Loading packages...
                </p>
            ) : packages.length === 0 ? (
                <p className="text-center text-slate-400">
                    No packages found
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {packages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300"
                        >

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-sky-500/5 opacity-0 group-hover:opacity-100 transition"></div>

                            <div className="relative z-10">

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-white">
                                    {pkg.name}
                                </h2>

                                <p className="text-sky-400 mt-1 font-medium">
                                    {pkg.type}
                                </p>

                                {/* Features */}
                                <div className="mt-5 space-y-2 text-sm text-slate-300">
                                    <p>📄 Pages: {pkg.pages}</p>
                                    <p>⏱ Timeline: {pkg.timeline}</p>
                                    <p>🔁 Revisions: {pkg.revision}</p>
                                </div>

                                {/* Details */}
                                <p className="mt-4 text-slate-400 text-sm line-clamp-3">
                                    {pkg.details}
                                </p>

                                {/* Price */}
                                <div className="mt-6 text-3xl font-bold text-sky-400">
                                    ${pkg.price}
                                </div>

                                {/* Button */}
                                <button className="mt-6 w-full py-3 rounded-xl bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:scale-[1.02] transition-all duration-300">
                                    Select This Package
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default Packages;