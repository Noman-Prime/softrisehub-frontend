import {
  LogOut,
  CircleUser,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
        { withCredentials: true }
      );
      setUser(res.data.user || null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("auth-change", fetchUser);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("auth-change", fetchUser);
    };
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);
      toast.success("Logged out");
      window.dispatchEvent(new Event("auth-change"));
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "About", path: "/about" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050814]/80 backdrop-blur-2xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-3 shrink-0">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
            S
          </div>

          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-none">
              SoftRise<span className="text-blue-400">Hub</span>
            </span>
            <span className="text-[10px] text-white/40 tracking-[0.25em] uppercase">
              SaaS Platform
            </span>
          </div>

        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-white transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {!user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-white/70 hover:text-white text-sm">
                Sign in
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-500 transition"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="relative" ref={profileRef}>

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <img
                  src={user?.image?.url || "/logo.png"}
                  className="w-8 h-8 rounded-lg object-cover"
                />

                <ChevronDown
                  size={14}
                  className={`text-white/60 transition ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0B0F19] border border-white/10 rounded-2xl p-3 shadow-2xl">

                  <div className="px-3 py-3 border-b border-white/10 mb-2">
                    <p className="text-white text-sm font-semibold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-white/40 text-xs">{user.role}</p>
                  </div>

                  {/* 🔥 FIXED PROFILE ROUTE WITH ID */}
                  <Link
                    to={`/users/${user._id}`}
                    className="flex items-center gap-2 px-3 py-2 text-white/70 hover:text-white rounded-lg hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    <CircleUser size={16} /> Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <LogOut size={16} /> Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-5 bg-[#050814] border-t border-white/10">

          <div className="flex flex-col gap-4 text-white/70 text-sm mt-4">

            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}

          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;