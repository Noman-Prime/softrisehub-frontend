import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { user, setUser } = useAuth();
  const dropdownRef = useRef(null);
  const mobileRef = useRef(null);

  const toggleMenu = (type) => {
    setActiveMenu(activeMenu === type ? null : type);
  };

  const closeMenus = () => {
    setActiveMenu(null);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      mobileRef.current &&
      !mobileRef.current.contains(event.target)
    ) {
      closeMenus();
    }
  };

  const listenUserUpdates = () => {
    if (!user) return;

    const findUser = new EventSource(
      `${import.meta.env.VITE_API_URL}/api/v1/user/me`
    );

    findUser.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data?.error === "Unauthorized") {
          setUser(null);
          findUser.close();
          return;
        }

        if (data?.user) setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    findUser.onerror = (err) => console.log(err);

    return findUser;
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );

      if (res) {
        toast.success(`${user?.firstName || "User"} logged out`);
        setUser(null);
        closeMenus();
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const getInitials = () => {
    const f = user?.firstName?.[0] || "";
    const l = user?.lastName?.[0] || "";
    return (f + l).toUpperCase() || "U";
  };

  const navLinks = (
    <>
      <Link className="text-slate-200 hover:text-sky-400" to="/">Home</Link>
      <Link className="text-slate-200 hover:text-sky-400" to="/products">Products</Link>
      <Link className="text-slate-200 hover:text-sky-400" to="/services">Services</Link>
      <Link className="text-slate-200 hover:text-sky-400" to="/packages">Packages</Link>
      <Link className="text-slate-200 hover:text-sky-400" to="/about">About</Link>
      <Link className="text-slate-200 hover:text-sky-400" to="/contact">Contact</Link>
    </>
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const stream = listenUserUpdates();
    return () => stream?.close();
  }, [user?._id]);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-700">
      <div className="text-2xl font-bold text-sky-400">SoftRiseHub</div>
      <div className="hidden md:flex gap-8">{navLinks}</div>
      <div className="flex items-center gap-4 relative">
        <div className="cursor-pointer" onClick={() => toggleMenu("user")}>
          {user?.image?.url ? (
            <img className="w-8 h-8 rounded-full border border-sky-400" src={user.image.url} />
          ) : user ? (
            <div className="w-8 h-8 flex items-center justify-center bg-sky-500 text-white text-xs font-bold rounded-full">
              {getInitials()}
            </div>
          ) : (
            <User className="text-slate-200" size={20} />
          )}
        </div>

        {activeMenu === "user" && (
          <div ref={dropdownRef} className="absolute right-0 top-12 w-48 bg-slate-800 border border-slate-700 rounded-xl p-3 flex flex-col gap-2">

            {user ? (
              <>
                <div className="text-sky-400 border-b border-slate-700 pb-1">
                  {user.firstName} {user.lastName}
                </div>
                <Link className="text-slate-200 hover:bg-slate-700 px-2 py-1 rounded" to={`/users/${user._id}`} onClick={closeMenus}>
                  My Account
                </Link>
                <button className="text-rose-400 hover:bg-rose-500/10 px-2 py-1 text-left rounded" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="bg-slate-700 text-center py-2 rounded" to="/login" onClick={closeMenus}>
                  Login
                </Link>
                <Link className="bg-slate-700 text-center py-2 rounded" to="/signup" onClick={closeMenus}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}

        <div className="md:hidden" ref={mobileRef}>
          <button onClick={() => toggleMenu("pages")}>
            {activeMenu === "pages" ? <X className="text-slate-200" /> : <Menu className="text-slate-200" />}
          </button>
          {activeMenu === "pages" && (
            <div className="absolute right-0 top-12 w-48 bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-4">
              {navLinks}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;