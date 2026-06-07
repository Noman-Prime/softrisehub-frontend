import React from "react";
import { Mail, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Footer from "../Components/Footer.jsx"

const Contact = () => {
  return (
    <>
    <section className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 font-sans antialiased relative overflow-hidden">
      
      {/* Structural Ambient Background Details */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2B3F43]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 left-10 w-[400px] h-[400px] bg-sky-100/40 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Typographic Branding info */}
        <div className="md:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.3em] text-[#2B3F43] uppercase block opacity-80">
              / CONNECT
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#2B3F43] leading-[1.1]">
              Let's build what comes next.
            </h1>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal opacity-90">
              Have a platform that needs scaling, a system that needs rewriting, or a custom application idea? Tell us what you are working on. We respond personally within one business day.
            </p>
          </div>

          {/* Communications Channels */}
          <div className="pt-8 space-y-6 border-t-2 border-[#2B3F43]/10">
            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-[#2B3F43] text-white shadow-md">
                <Mail size={16} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3F43] text-xs tracking-wider uppercase opacity-60">Direct Line</h4>
                <p className="text-sm text-slate-700 font-semibold mt-0.5">projects@softrisehub.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 rounded-xl bg-[#2B3F43] text-white shadow-md">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="font-bold text-[#2B3F43] text-xs tracking-wider uppercase opacity-60">Studio HQ</h4>
                <p className="text-sm text-slate-700 font-semibold mt-0.5">Silicon Valley, Tech Block, Suite 404</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Card Matched Directly to Navbar Brand Color */}
        <div className="md:col-span-7 bg-[#2B3F43] rounded-2xl p-6 sm:p-10 shadow-[0_12px_40px_rgba(43,63,67,0.15)] border border-[#2B3F43]">
          <div className="space-y-6">
            
            {/* Input Block: Balanced Label and Premium Dark Background Fields */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider opacity-90">
                Your Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Alex Chen"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-200 text-sm shadow-inner"
              />
            </div>

            {/* Input Block */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider opacity-90">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-200 text-sm shadow-inner"
              />
            </div>

            {/* Textarea Block */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider opacity-90">
                Project Summary <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Provide a quick summary of what you are trying to execute..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-200 text-sm resize-none shadow-inner"
              />
            </div>

            {/* High-Contrast Action Button for Dark Container Surface */}
            <button
              type="button"
              className="w-full py-4 px-4 bg-white hover:bg-slate-100 text-[#2B3F43] font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <span>Send Inquiry</span>
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* System Notification Badges Adjustments for Dark Surface Integration */}
            <div className="p-4 bg-white/5 border border-emerald-500/20 rounded-xl text-emerald-300 text-xs font-medium flex items-center gap-3">
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
              <span>Message transmitted successfully. Our team will reach out shortly.</span>
            </div>

            <div className="p-4 bg-white/5 border border-rose-500/20 rounded-xl text-rose-300 text-xs font-medium flex items-center gap-3">
              <AlertCircle size={16} className="text-rose-400 flex-shrink-0" />
              <span>Transmission error. Please verify parameters and retry.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
};

export default Contact;