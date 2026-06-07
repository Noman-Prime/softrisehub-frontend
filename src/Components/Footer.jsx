import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    /* FULL BACKGROUND CONVERSION: Anchors the entire page layout matching the header */
    <footer className="relative bg-[#2B3F43] pt-12 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 overflow-hidden border-t border-white/10 font-sans">
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sky-300/5 blur-[100px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
          
          {/* BRAND COLUMN */}
          <div className="sm:col-span-2 md:col-span-4 space-y-4 md:space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center font-black text-white shadow-md">
                S
              </div>
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">
                SoftRiseHub
              </h2>
            </div>

            <p className="text-xs md:text-sm text-slate-200/90 leading-relaxed max-w-sm">
              We design and engineer high-performance custom software, real-time data streaming architectures, and cloud-native digital systems.
            </p>

            {/* SOCIAL LINK SYSTEM */}
            <div className="flex gap-3 pt-1">
              <a 
                href="https://linkedin.com/company/softrisehub" 
                target="_blank" 
                rel="noreferrer" 
                className="group w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:border-sky-300/60 text-slate-200 hover:text-sky-300 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <FaLinkedinIn className="text-sm md:text-base" />
              </a>

              <a 
                href="https://github.com/softrisehub" 
                target="_blank" 
                rel="noreferrer" 
                className="group w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:border-sky-300/60 text-slate-200 hover:text-white hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <FaGithub className="text-sm md:text-base" />
              </a>

              <a 
                href="https://x.com/softrisehub" 
                target="_blank" 
                rel="noreferrer" 
                className="group w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 hover:border-sky-300/60 text-slate-200 hover:text-sky-300 hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
              >
                <FaXTwitter className="text-sm md:text-base" />
              </a>
            </div>
          </div>

          {/* SERVICES LINK SECT */}
          <div className="md:col-span-2 md:ml-auto">
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[2px] text-slate-300/70 mb-4 md:mb-6">
              Services
            </h3>
            <ul className="space-y-2.5 md:space-y-3.5 text-xs md:text-sm">
              <li className="group w-fit">
                <Link to="/services/web-development" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  Web Development
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/services/mobile-apps" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  Mobile Apps
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/services/cloud-systems" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  Cloud Systems
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/services/ui-design" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  UI Design
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY LINK SECT */}
          <div className="md:col-span-2 md:ml-auto">
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[2px] text-slate-300/70 mb-4 md:mb-6">
              Company
            </h3>
            <ul className="space-y-2.5 md:space-y-3.5 text-xs md:text-sm">
              <li className="group w-fit">
                <Link to="/about" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  About
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/careers" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  Careers
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/blogs" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  Blog
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/contact" className="text-slate-200 hover:text-sky-300 transition-colors duration-200 relative block font-medium">
                  Contact
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-sky-300 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT BOX */}
          <div className="sm:col-span-2 md:col-span-4">
            <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[2px] text-slate-300/70 mb-4 md:mb-6">
              Connect
            </h3>
            {/* INNER CARD SHADOW PANEL: Framed cleanly with fine lines inside the footer context */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md space-y-2">
              <p className="text-[10px] sm:text-xs font-bold text-sky-300 uppercase tracking-wider">
                Technical Intake Unit
              </p>
              <p className="text-xs md:text-sm text-slate-200">
                Have a software blueprint ready for review?
              </p>
              <a
                href="mailto:support@softrisehub.com"
                className="inline-block text-xs md:text-sm font-semibold text-white hover:text-sky-300 transition-colors duration-200 pt-1"
              >
                support@softrisehub.com
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM SEPARATION LAYER */}
        <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs text-slate-300/60 font-medium tracking-wide text-center sm:text-left">
            © {currentYear} SoftRiseHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs font-semibold tracking-wider text-slate-300/60">
            <Link to="/privacy" className="hover:text-sky-300 transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-sky-300 transition-colors duration-200">
              Terms
            </Link>
            <Link to="/FAQs" className="hover:text-sky-300 transition-colors duration-200">
              FAQs
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;