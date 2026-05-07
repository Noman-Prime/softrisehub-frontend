import React, { useState } from 'react';
import axios from 'axios';

const Packages = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'Website',
        pages: '',
        timeline: '',
        revision: '',
        price: '',
        details: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmission = async () => {
        setLoading(true);
        try {
            // Ensure this points to your LIVE URL
            const LIVE_API_URL = `${import.meta.env.VITE_API_URL}/api/v1/package/create`;
            
            const response = await axios.post(LIVE_API_URL, formData, {
                withCredentials: true 
            });

            if (response.data.success) {
                alert("✅ Package created successfully on the Live Server!");
                setFormData({ name: '', type: 'Website', pages: '', timeline: '', revision: '', price: '', details: '' });
            }
        } catch (error) {
            console.error("Submission Error:", error);
            alert(error.response?.data?.message || "❌ Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10 flex flex-col items-center">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
                
                <h2 className="text-3xl font-bold text-sky-400 mb-2">Create Service Package</h2>
                <p className="text-slate-400 mb-8 text-sm">Add new offerings to your software hub.</p>
                
                <div className="flex flex-col gap-5">
                    
                    {/* Package Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Package Name</label>
                        <input 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="e.g. Premium SaaS" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
                        />
                    </div>

                    {/* Type Select */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Project Category</label>
                        <select 
                            name="type" 
                            value={formData.type} 
                            onChange={handleChange} 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all appearance-none"
                        >
                            <option value="Website">Website</option>
                            <option value="SaaS Application">SaaS Application</option>
                            <option value="AI">AI</option>
                        </select>
                    </div>

                    {/* Pages & Price Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Pages</label>
                            <input 
                                name="pages" 
                                value={formData.pages} 
                                onChange={handleChange} 
                                placeholder="10 Pages" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Price ($)</label>
                            <input 
                                name="price" 
                                type="number"
                                value={formData.price} 
                                onChange={handleChange} 
                                placeholder="499" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    {/* Timeline & Revisions Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Timeline</label>
                            <input 
                                name="timeline" 
                                value={formData.timeline} 
                                onChange={handleChange} 
                                placeholder="7 Days" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Revisions</label>
                            <input 
                                name="revision" 
                                value={formData.revision} 
                                onChange={handleChange} 
                                placeholder="Unlimited" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    {/* Details Textarea */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-300 ml-1">Package Details</label>
                        <textarea 
                            name="details" 
                            value={formData.details} 
                            onChange={handleChange} 
                            placeholder="Describe what's included..." 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 h-28 resize-none"
                        />
                    </div>

                    {/* Custom Button (DIV) */}
                    <div 
                        onClick={!loading ? handleSubmission : null}
                        className={`mt-4 p-4 rounded-xl text-center font-bold text-slate-950 transition-all duration-300 select-none
                            ${loading 
                                ? 'bg-slate-700 cursor-not-allowed opacity-70' 
                                : 'bg-sky-400 hover:bg-sky-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] active:scale-95 cursor-pointer'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-slate-900" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending to Cloud...
                            </span>
                        ) : "Create Package"}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Packages;