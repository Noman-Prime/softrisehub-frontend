import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-white font-bold text-2xl">SoftRiseHub</h2>
          <p className="mt-2 text-sm">Building the future of software, one pixel at a time.</p>
        </div>
        <div className="flex gap-8 text-sm">
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
        <p className="text-xs">© 2026 SoftRiseHub. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer