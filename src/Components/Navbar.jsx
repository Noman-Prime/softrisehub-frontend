import {
  MoreVertical,
  LogIn,
  UserPlus,
  Home,
  Package,
  Settings,
  LogOut,
  CircleUser,
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  Zap
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  // --- KEEPING YOUR LOGIC EXACTLY AS IS ---
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  const [open, setOpen] = useState({
    profile: false,
    mobile: false,
  });

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`,
          { withCredentials: true }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    checkLogin();

    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen((pre) => ({ ...pre, profile: false }));
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setOpen((pre) => ({ ...pre, mobile: false }));
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleProfile = () =>
    setOpen((pre) => ({ ...pre, profile: !pre.profile }));

  const toggleMobile = () =>
    setOpen((pre) => ({ ...pre, mobile: !pre.mobile }));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen({ profile: false, mobile: false });
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
      if (response) {
        setUser(null);
        toast.success("Logout Successful");
        scrollToTop();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
  <header className="sticky top-0 z-[100] bg-white/60 backdrop-blur-3xl border-b border-slate-200/30">

    {/* subtle top glow line */}
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

    <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-20">

      {/* LEFT BRAND */}
      <div className="flex items-center gap-10">

        <Link
          to="/"
          onClick={scrollToTop}
          className="flex items-center gap-3 group"
        >

          {/* logo container upgrade */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white font-black shadow-lg group-hover:scale-105 transition">

            <span className="z-10">S</span>

            {/* glow */}
            <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>
          </div>

          <div className="flex flex-col">
            <span className="text-slate-900 font-black text-xl leading-none tracking-tight group-hover:text-blue-600 transition">
              SoftRise<span className="text-blue-600">Hub</span>
            </span>

            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.3em] mt-1">
              SaaS Platform
            </span>
          </div>

        </Link>

        {/* NAV */}
        <nav className="hidden lg:flex items-center gap-2">

          {[
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: "Services", path: "/services" }
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition group"
            >
              {item.name}

              {/* animated underline */}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-blue-600 group-hover:w-4/5 transition-all duration-300"></span>
            </Link>
          ))}

        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {!user ? (
          <div className="hidden sm:flex items-center gap-3">

            <Link
              to="/login"
              className="text-sm font-semibold text-slate-500 hover:text-slate-900 px-4 py-2 rounded-xl hover:bg-slate-100 transition"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              className="relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 transition shadow-lg hover:shadow-blue-200"
            >
              Get Started <ArrowRight size={16} />

              {/* shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition duration-700"></div>
            </Link>

          </div>
        ) : (
          <div className="relative flex items-center gap-4" ref={profileRef}>

            {/* status pill upgraded */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">
                Live
              </span>
            </div>

            {/* profile button premium */}
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 px-2 py-1.5 rounded-2xl border border-slate-200 bg-white hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="w-9 h-9 rounded-xl overflow-hidden">
                <img src="/logo.png" className="w-full h-full object-cover" />
              </div>

              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${open.profile ? "rotate-180" : ""}`}
              />
            </button>

            {/* dropdown premium feel */}
            {open.profile && (
              <div className="absolute right-0 top-full mt-4 w-64 bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-3xl shadow-2xl p-3">

                <div className="px-4 py-4 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 mb-2">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    Signed in
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <Link
                  to="/me"
                  className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition"
                >
                  <CircleUser size={18} />
                  Account
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

        {/* mobile */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition"
        >
          <MoreVertical size={20} />
        </button>

      </div>
    </div>
  </header>
);
};

export default Navbar;