import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import axios from "axios";
import { useAuth } from "../utils/userAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [mobileShow, setMobileShow] = useState(false);
  const navRef = useRef(null);

  const { user, setUser } = useAuth()

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShow(false);
        setMobileShow(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {}, { withCredentials: true });
      setUser(null);
      setShow(false);
      navigate("/")
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 flex items-center justify-between px-6 py-2 bg-[#2B3F43] border-b border-slate-700 shadow-md">
      <div className="text-xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>SoftRise</div>

      <div className="hidden md:flex gap-4 text-white text-sm font-medium">
        {["Home", "Products", "Services", "Packages", "About", "Contact"].map((link) => (
          <Link key={link} to={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">
            {link}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        <div className="relative">
          <div className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setShow(!show); setMobileShow(false); }}>
            {user ? (
              user.image?.url ? (
                <img className="w-7 h-7 rounded-full border border-sky-400 object-cover" src={user.image.url} alt="Profile" />
              ) : (
                <div className="w-7 h-7 flex items-center justify-center bg-white text-black text-xs font-bold rounded-full">{user.firstName?.[0]}{user.lastName?.[0]}</div>
              )
            ) : (
              <User className="text-blue-400" size={24} />
            )}
          </div>

          {show && (
            <div className="absolute right-0 top-10 w-40 bg-[#2B3F43] border border-white rounded-[15px] p-2 flex flex-col gap-1 shadow-2xl z-50">
              {user ? (
                <>
                  <Link className="text-center text-sm font-bold bg-white text-black p-2 rounded-[10px]" to={`/users/${user._id}`} onClick={() => setShow(false)}>{user.firstName} {user.lastName}</Link>
                  <button className="text-center text-sm font-bold bg-white text-black p-2 rounded-[10px]" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="text-center text-sm font-bold bg-white text-black p-2 rounded-[10px]" to="/login" onClick={() => setShow(false)}>Login</Link>
                  <Link className="text-center text-sm font-bold bg-white text-black p-2 rounded-[10px]" to="/signup" onClick={() => setShow(false)}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>

        <button className="md:hidden text-white" onClick={() => { setMobileShow(!mobileShow); setShow(false); }}>
          {mobileShow ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileShow && (
        <div className="absolute top-[52px] right-0 w-40 bg-[#2B3F43] border border-white rounded-[15px] p-3 flex flex-col gap-2 md:hidden shadow-2xl z-40">
          {["Home", "Products", "Services", "Packages", "About", "Contact"].map((link) => (
            <Link key={link} to={link === "Home" ? "/" : `/${link.toLowerCase()}`} onClick={() => setMobileShow(false)} className="block bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">
              {link}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;