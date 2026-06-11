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

  // Restored your original EventSource logic
  useEffect(() => {
    const updatedData = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/user/login`, { withCredentials: true });
    updatedData.onmessage = (event) => {
      try {
        const result = JSON.parse(event.data);
        if (result && result.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.log("Parse is not working", error);
      }
    };
    updatedData.onerror = (error) => {
      console.log("updatedData is not working: ", error);
    };
    return () => {
      updatedData.close();
    };
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

  const PageLinks = [
    <Link to="/" key="home" className="hover:text-green-400 transition-colors">Home</Link>,
    <Link to="/products" key="products" className="hover:text-green-400 transition-colors">Products</Link>,
    <Link to="/services" key="services" className="hover:text-green-400 transition-colors">Services</Link>,
    <Link to="/packages" key="packages" className="hover:text-green-400 transition-colors">Packages</Link>,
    <Link to="/about" key="about" className="hover:text-green-400 transition-colors">About</Link>,
    <Link to="/contact" key="contact" className="hover:text-green-400 transition-colors">Contact</Link>,
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#2B3F43] border-b border-slate-700 shadow-md">
      <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => navigate("/")}>SoftRise</div>

      <div className="hidden md:flex gap-8 text-white font-medium">{PageLinks}</div>

      <div className="flex items-center gap-4">
        <div ref={navRef} className="relative flex items-center">
          <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={(e) => { e.stopPropagation(); setShow(!show); setMobileShow(false); }}>
            {user ? (
              user.image?.url ? (
                <img className="w-8 h-8 rounded-full border border-sky-400 object-cover" src={user.image.url} alt="Profile" />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center bg-white text-black text-xs font-bold rounded-full">{user.firstName?.[0]}{user.lastName?.[0]}</div>
              )
            ) : (
              <User className="text-slate-200" size={24} />
            )}
          </div>

          {show && (
            <div className="absolute right-0 top-12 w-48 bg-[#2B3F43] border border-white rounded-[20px] p-3 flex flex-col gap-2 shadow-2xl z-50">
              {user ? (
                <>
                  <Link className="flex text-black justify-center font-bold bg-white px-1 py-2 rounded-[15px] hover:bg-green-500 transition-colors" to={`/users/${user._id}`} onClick={() => setShow(false)}>{user.firstName} {user.lastName}</Link>
                  <button className="flex text-black justify-center font-bold bg-white px-1 py-2 rounded-[15px] hover:bg-black hover:text-red-500 transition-colors" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link className="bg-black text-white text-center py-2 rounded-[15px] hover:bg-green-700 transition-colors" to="/login" onClick={() => setShow(false)}>Login</Link>
                  <Link className="bg-black text-white text-center py-2 rounded-[15px] hover:bg-green-700 transition-colors" to="/signup" onClick={() => setShow(false)}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>

        <div className="md:hidden text-white cursor-pointer" onClick={() => { setMobileShow(!mobileShow); setShow(false); }}>
          {mobileShow ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {mobileShow && (
        <div 
          className="absolute top-[68px] right-0 w-48 bg-[#2B3F43] border border-white rounded-[20px] p-4 flex flex-col gap-2 md:hidden shadow-2xl z-40" 
          onClick={() => setMobileShow(false)}
        >
          {PageLinks.map((link, index) => (
            <div
              key={index}
              className="block bg-white font-bold text-black text-center py-2 rounded-[15px] hover:bg-green-700 hover:text-white transition-colors"
            >
              {link}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;