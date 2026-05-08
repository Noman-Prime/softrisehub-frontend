import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B0F19] text-white pt-28 pb-12 px-6 overflow-hidden">

      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[160px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          <div className="md:col-span-4 space-y-5">

            <div className="flex items-center gap-3">

              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
                S
              </div>

              <h2 className="text-xl font-bold tracking-tight">
                SoftRiseHub
              </h2>

            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              We design and build digital products focused on performance, clarity, and long-term scalability.
            </p>

          </div>

          <div className="md:col-span-2">

            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
              Services
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">

              {["Web Development", "Mobile Apps", "Cloud Systems", "UI Design"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          <div className="md:col-span-2">

            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
              Company
            </h3>

            <ul className="space-y-4 text-sm text-slate-400">

              {["About", "Careers", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">
                    {item}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          <div className="md:col-span-4">

            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">
              Connect
            </h3>

            <div className="flex gap-4 mb-8">

              <a
                href="#"
                className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40 hover:bg-[#1DA1F2]/10 transition"
              >
                <FaTwitter size={18} />
              </a>

            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1">
                Contact
              </p>

              <a
                href="mailto:hello@softrisehub.com"
                className="text-sm text-white hover:text-blue-400 transition"
              >
                info@softrisehub.com
              </a>

            </div>

          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-slate-500">
            © 2026 SoftRiseHub. All rights reserved.
          </p>

          <div className="flex gap-8 text-xs tracking-widest uppercase text-slate-500">

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