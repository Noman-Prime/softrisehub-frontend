import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] text-white pt-24 pb-10 px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-blue-600/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 mb-20">

          {/* BRAND */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-bold text-lg italic">S</span>
              </div>
              <h2 className="font-bold text-2xl tracking-tight">
                SoftRiseHub
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building scalable SaaS products and intelligent systems designed for modern businesses.
            </p>
          </div>

          {/* SERVICES */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Services
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {["Web Development", "Mobile Apps", "Cloud Solutions", "UI/UX Design"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Company
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-6 text-gray-300">
              Connect
            </h3>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mb-6">

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaTwitter size={18} />
              </a>

            </div>

            {/* EMAIL */}
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Business inquiries
              </p>
              <a
                href="mailto:hello@softrisehub.com"
                className="text-sm font-medium text-white hover:text-blue-400 transition"
              >
                hello@softrisehub.com
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-gray-500 text-sm">
            © 2026 SoftRiseHub. All rights reserved.
          </div>

          <div className="flex gap-8 text-xs uppercase tracking-wide text-gray-500">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="hover:text-white transition">
                {item}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;