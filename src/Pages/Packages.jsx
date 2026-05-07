import React, { useState } from "react";
import axios from "axios";

const Packages = () => {
    const [formData, setFormData] = useState({
        name: "",
        type: "Website",
        pages: "",
        timeline: "",
        revision: "",
        price: "",
        details: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/package/create`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (data.success) {
                alert("Package Created Successfully");

                setFormData({
                    name: "",
                    type: "Website",
                    pages: "",
                    timeline: "",
                    revision: "",
                    price: "",
                    details: "",
                });
            }
        } catch (error) {
            console.log(error);

            alert(
                error.response?.data?.message ||
                    "Failed To Create Package"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5 shadow-2xl"
            >
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Create Package
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Add new service package
                    </p>
                </div>

                <input
                    type="text"
                    name="name"
                    placeholder="Package Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-sky-500"
                    required
                />

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-sky-500"
                >
                    <option value="Website">Website</option>
                    <option value="SaaS Application">
                        SaaS Application
                    </option>
                    <option value="AI">AI</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="pages"
                        placeholder="Pages"
                        value={formData.pages}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-sky-500"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-sky-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="timeline"
                        placeholder="Timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-sky-500"
                    />

                    <input
                        type="text"
                        name="revision"
                        placeholder="Revision"
                        value={formData.revision}
                        onChange={handleChange}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-sky-500"
                    />
                </div>

                <textarea
                    name="details"
                    placeholder="Package Details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full h-32 bg-slate-800 border border-slate-700 rounded-xl p-3 text-white outline-none resize-none focus:border-sky-500"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full rounded-xl p-3 font-semibold transition-all duration-300 ${
                        loading
                            ? "bg-slate-700 text-slate-300 cursor-not-allowed"
                            : "bg-sky-500 hover:bg-sky-400 text-black"
                    }`}
                >
                    {loading ? "Creating..." : "Create Package"}
                </button>
            </form>
        </div>
    );
};

export default Packages;