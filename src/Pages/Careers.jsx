import React, { useState } from "react";

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    portfolio: "",
    resume: null,
  });

  const jobs = [
    {
      id: "fs-01",
      title: "Full-Stack Software Engineer",
      team: "Engineering",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: "ui-02",
      title: "Product Designer",
      team: "Design",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: "gro-03",
      title: "Growth & Marketing Manager",
      team: "Operations",
      location: "Remote",
      type: "Contract",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Process application payload
    setTimeout(() => {
      setSubmitting(false);
      setSelectedJob(null);
      setFormData({ fullName: "", email: "", portfolio: "", resume: null });
      alert("Application submitted successfully.");
    }, 1000);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-slate-50 text-slate-900 font-sans antialiased px-4 sm:px-6 lg:px-8 py-20 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-16 text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 block mb-3">
            / Careers
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Join the engineering matrix
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
            We are building automated platforms and high-throughput SaaS architectures. If you optimize for programmatic efficiency and clean interfaces, apply below.
          </p>
        </div>

        {/* Positions Table/Row Structure */}
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl shadow-[0_24px_48px_-12px_rgba(15,23,42,0.04)] overflow-hidden">
          <div className="divide-y divide-slate-100">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition duration-150"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {job.team} // {job.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight truncate">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-500 font-normal">{job.location}</span>
                    <span className="text-slate-300 text-xs">•</span>
                    <span className="text-xs text-slate-500 font-normal">{job.type}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition active:scale-[0.98] cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MODAL WINDOW INTERFACE */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 relative">
            
            <div className="mb-6 text-left">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Apply for {selectedJob.title}
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-1">
                Complete the standard baseline submission.
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div className="w-full">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 bg-slate-50 text-slate-900 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>

              <div className="w-full">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 bg-slate-50 text-slate-900 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>

              <div className="w-full">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Portfolio URL
                </label>
                <input
                  name="portfolio"
                  type="url"
                  placeholder="https://github.com/..."
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 bg-slate-50 text-slate-900 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:bg-white transition"
                />
              </div>

              <div className="w-full">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Resume (PDF)
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                />
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="w-full bg-slate-100 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-slate-200 transition active:scale-[0.99]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-slate-900 text-white text-xs font-bold py-2.5 px-4 rounded-lg hover:bg-slate-800 transition active:scale-[0.99] disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;