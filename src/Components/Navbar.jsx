import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { user, setUser } = useState(null);
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
      <Link className="text-white font-bold hover:text-[#030000]" to="/">Home</Link>
      <Link className="text-white font-bold hover:text-[#030000]" to="/products">Products</Link>
      <Link className="text-white font-bold hover:text-[#030000]" to="/services">Services</Link>
      <Link className="text-white font-bold hover:text-[#030000]" to="/packages">Packages</Link>
      <Link className="text-white font-bold hover:text-[#030000]" to="/about">About</Link>
      <Link className="text-white font-bold hover:text-[#030000]" to="/contact">Contact</Link>
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
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-2 bg-[#2B3F43] border-b border-slate-700">
      <div className="text-2xl font-bold text-white hover:text-[#030000]">SoftRise</div>
      <div className="hidden md:flex gap-8">{navLinks}</div>
      <div className="flex items-center gap-4 relative">
        <div className="cursor-pointer" onClick={() => toggleMenu("user")}>
          {user?.image?.url ? (
            <img className="w-8 h-8 rounded-full border border-sky-400" src={user.image.url} />
          ) : user ? (
            <div className="w-8 h-8 flex items-center justify-center bg-white text-white text-xs font-bold rounded-full hover:bg-[#030000] hover:text-[#030000]">
              {getInitials()}
            </div>
          ) : (
            <User className="text-slate-200" size={20} />
          )}
        </div>

        {activeMenu === "user" && (
          <div ref={dropdownRef} >

            {user ? (
              <>
              <div className="absolute right-0 top-12 w-48 bg-[#2B3F43] border border-white rounded-[20px] p-3 flex flex-col gap-2">
                <Link className="flex text-black justify-center font-bold bg-white px-1 py-2 rounded-[15px] hover:bg-green-500" to={`/users/${user._id}`} onClick={closeMenus}>
                {user.firstName} {user.lastName}
                </Link>
                <button className="flex text-black justify-center font-bold bg-white px-1 py-2 rounded-[15px] hover:bg-black hover:text-red-900" onClick={handleLogout}>
                  Logout
                </button>
                </div>
              </>
            ) : (
              <>
              <div className="absolute right-0 top-12 w-35 bg-[#2B3F43] border border-white rounded-[20px] p-3 flex flex-col gap-2">
                <Link className="bg-black text-white text-center py-2 rounded-[15px] hover:text-[#030000] hover:font-bold hover:bg-green-700" to="/login" onClick={closeMenus}>
                  Login
                </Link>
                <Link className="bg-black text-white text-center py-2 rounded-[15px] hover:text-[#030000] hover:font-bold hover:bg-green-700" to="/signup" onClick={closeMenus}>
                  Sign Up
                </Link>
                </div>
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