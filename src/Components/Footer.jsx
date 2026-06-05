import React from "react";
import { Link } from "react-router-dom"; // Swap to <a> tags if not using react-router-dom
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 pt-24 pb-12 px-6 overflow-hidden border-t border-slate-900 font-sans">
      
      {/* Premium Dark Mesh Gradient Backplanes */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* BRAND COLUMN */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-slate-950 shadow-md shadow-emerald-500/10">
                S
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                SoftRiseHub
              </h2>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We design and engineer high-performance custom software, real-time data streaming architectures, and cloud-native digital systems.
            </p>

            {/* SOCIAL LINK SYSTEM */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://linkedin.com/company/softrisehub" 
                target="_blank" 
                rel="noreferrer" 
                className="group w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800/80 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 hover:-translate-y-0.5 transition-all duration-200"
              >
                <FaLinkedinIn className="text-base" />
              </a>

              <a 
                href="https://github.com/softrisehub" 
                target="_blank" 
                rel="noreferrer" 
                className="group w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800/80 hover:border-slate-600 text-slate-400 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <FaGithub className="text-base" />
              </a>

              <a 
                href="https://x.com/softrisehub" 
                target="_blank" 
                rel="noreferrer" 
                className="group w-10 h-10 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800/80 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 hover:-translate-y-0.5 transition-all duration-200"
              >
                <FaXTwitter className="text-base" />
              </a>
            </div>
          </div>

          {/* SERVICES LINK SECT */}
          <div className="md:col-span-2 md:ml-auto">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
              Services
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="group w-fit">
                <Link to="/services/web-development" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  Web Development
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/services/mobile-apps" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  Mobile Apps
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/services/cloud-systems" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  Cloud Systems
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/services/ui-design" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  UI Design
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY LINK SECT */}
          <div className="md:col-span-2 md:ml-auto">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
              Company
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="group w-fit">
                <Link to="/about" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  About
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  Careers
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  Blog
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
              <li className="group w-fit">
                <Link to="/contact" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200 relative block">
                  Contact
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* CONNECT BOX */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-6">
              Connect
            </h3>
            <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/30 backdrop-blur-md space-y-2.5">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                Technical Intake Unit
              </p>
              <p className="text-sm text-slate-400">
                Have a software blueprint ready for review?
              </p>
              <a
                href="mailto:support@softrisehub.com"
                className="inline-block text-sm font-semibold text-white hover:text-emerald-400 transition-colors duration-200 pt-1"
              >
                support@softrisehub.com
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM SEPARATION LAYER */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 tracking-wide">
            © {currentYear} SoftRiseHub. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs font-medium tracking-wider text-slate-500">
            <Link to="/privacy" className="hover:text-emerald-400 transition-colors duration-200">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-emerald-400 transition-colors duration-200">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-emerald-400 transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;