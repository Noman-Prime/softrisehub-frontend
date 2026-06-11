import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [mobileShow, setMobileShow] = useState(false);
  const [user, setUser] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const updatedData = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/user/login`, { withCredentials: true });
    updatedData.onmessage = (event) => {
      try {
        const result = JSON.parse(event.data);
        if (result && result.user) setUser(result.user);
      } catch (error) {
        console.log("Parse is not working", error);
      }
    };
    updatedData.onerror = (error) => {
      console.log("updatedData is not working: ", error);
    };
    return () => updatedData.close();
  }, []);

  const checkLogin = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, { withCredentials: true });
      if (result.data) setUser(result.data.user);
    } catch (error) {
      console.log(error.response?.data?.error);
    }
  };

  useEffect(() => {
    checkLogin();
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
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <nav ref={navRef} className="sticky top-0 z-50 flex items-center justify-between px-6 py-2 bg-[#2B3F43] border-b border-slate-700 shadow-md">
      <div className="text-xl font-bold text-white cursor-pointer transition-all duration-300 hover:text-green-400 hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]" onClick={() => navigate("/")}>SoftRise</div>

      <div className="hidden md:flex gap-4 text-white text-sm font-medium">
        <Link to="/" className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">Home</Link>
        <Link to="/products" className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">Products</Link>
        <Link to="/services" className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">Services</Link>
        <Link to="/packages" className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">Packages</Link>
        <Link to="/about" className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">About</Link>
        <Link to="/contact" className="px-3 py-1 rounded-[10px] border-2 border-transparent transition-colors hover:font-bold hover:bg-white hover:text-black hover:border-white">Contact</Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.stopPropagation(); setShow(!show); setMobileShow(false); }}>
            {user ? (
              user.image?.url ? (
                <img className="w-7 h-7 rounded-full border border-sky-400 object-cover" src={user.image.url} alt="Profile" />
              ) : (
                <div className="w-7 h-7 flex items-center justify-center bg-white text-black text-[10px] font-bold rounded-full">{user.firstName?.[0]}{user.lastName?.[0]}</div>
              )
            ) : (
              <div className="p-1.5 border border-transparent transition-all duration-300 hover:border-white rounded-full hover:bg-white cursor-pointer">
                <User className="text-blue-400 hover:text-black transition-colors" size={20} />
              </div>
            )}
          </div>

          {show && (
            <div className="absolute right-0 top-10 w-40 bg-[#2B3F43] border border-white rounded-[15px] p-2 flex flex-col gap-1 shadow-2xl z-50">
              {user ? (
                <>
                  <Link className="flex text-black justify-center text-sm font-bold bg-white px-2 py-1.5 rounded-[10px] hover:bg-green-500 transition-colors" to={`/users/${user._id}`} onClick={() => setShow(false)}>{user.firstName} {user.lastName}</Link>
                  <button className="flex text-black justify-center text-sm font-bold bg-white px-2 py-1.5 rounded-[10px] hover:bg-black hover:text-red-500 transition-colors" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px] hover:bg-black hover:text-white hover:border-white transition-colors" to="/login" onClick={() => setShow(false)}>Login</Link>
                  <Link className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px] hover:bg-black hover:text-white hover:border-white transition-colors" to="/signup" onClick={() => setShow(false)}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden text-white cursor-pointer" onClick={() => { setMobileShow(!mobileShow); setShow(false); }}>
          {mobileShow ? <X size={22} /> : <Menu size={22} />}
        </div>
      </div>

      {mobileShow && (
        <div className="absolute top-[52px] right-0 w-40 bg-[#2B3F43] border border-white rounded-[15px] p-3 flex flex-col gap-2 md:hidden shadow-2xl z-40">
          <Link to="/" onClick={() => setMobileShow(false)} className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">Home</Link>
          <Link to="/products" onClick={() => setMobileShow(false)} className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">Products</Link>
          <Link to="/services" onClick={() => setMobileShow(false)} className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">Services</Link>
          <Link to="/packages" onClick={() => setMobileShow(false)} className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">Packages</Link>
          <Link to="/about" onClick={() => setMobileShow(false)} className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">About</Link>
          <Link to="/contact" onClick={() => setMobileShow(false)} className="block border border-2 bg-white text-black text-sm font-bold text-center py-1.5 rounded-[10px]">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;