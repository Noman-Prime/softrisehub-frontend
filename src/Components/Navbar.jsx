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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                mobileRef.current &&
                !mobileRef.current.contains(event.target)
            ) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (!user) return;

        const findUser = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/user/me`, { withCredentials: true });
        
        findUser.onmessage = (event) => {
            try {
                const updatedData = JSON.parse(event.data);

                if (updatedData && updatedData.error === "Unauthorized") {
                    setUser(null);
                    findUser.close();
                    return;
                }

                if (updatedData && updatedData.user) {
                    setUser(updatedData.user);
                }
            } catch (error) {
                console.log("Parsing is giving error", error);
            }
        };

        findUser.onerror = (error) => {
            console.log("EventSource stream closed or resting:", error);
        };

        return () => {
            findUser.close();
        };
    }, [user?._id]);

    const handleLogout = async () => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/v1/user/logout`, 
                {}, 
                { withCredentials: true }
            );
            
            if (result) {
                const fName = user?.firstName || "User";
                const lName = user?.lastName || "";
                
                toast.success(`${fName} ${lName} logout Successfully`);
                setUser(null);
                setActiveMenu(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("User is not Logged out try again later");
        }
    };

    const getInitials = () => {
        const firstLetter = user?.firstName ? user.firstName[0] : "";
        const secondLetter = user?.lastName ? user.lastName[0] : "";
        return (firstLetter + secondLetter).toUpperCase() || "U";
    };

    const navLinks = (
        <>
            <Link to="/" className="text-slate-200 hover:text-sky-400 transition-all">Home</Link>
            <Link to="/projects" className="text-slate-200 hover:text-sky-400 transition-all">Products</Link>
            <Link to="/services" className="text-slate-200 hover:text-sky-400 transition-all">Services</Link>
            <Link to="/packages" className="text-slate-200 hover:text-sky-400 transition-all">Packages</Link>
            <Link to="/about" className="text-slate-200 hover:text-sky-400 transition-all">About</Link>
            <Link to="/contact" className="text-slate-200 hover:text-sky-400 transition-all">Contact</Link>
        </>
    );

    return (
        <nav className="sticky top-0 z-50 w-full flex items-center justify-between bg-slate-900 backdrop-blur-md px-6 py-4 border-b border-slate-700">
            <div className="text-2xl font-extrabold text-sky-400 hover:text-sky-300 cursor-pointer transition-all">
                SoftRiseHub
            </div>

            <div className="hidden md:flex items-center gap-8">
                {navLinks}
            </div>

            <div className="flex items-center gap-4 relative">
                <div 
                    className="flex items-center gap-2 cursor-pointer select-none" 
                    onClick={() => setActiveMenu(activeMenu === "user" ? null : "user")}
                >
                    {user && user.image?.url ? (
                        <img
                            src={user.image.url}
                            alt={`${user.firstName || "User"}'s profile`}
                            className="w-8 h-8 rounded-full border-2 border-sky-400 object-cover hover:scale-105 transition-all"
                        />
                    ) : user ? (
                        <div className="w-8 h-8 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center border-2 border-sky-400 hover:scale-105 transition-all tracking-wider">
                            {getInitials()}
                        </div>
                    ) : (
                        <User size={20} className="text-slate-200 hover:text-sky-400 transition-all" />
                    )}
                </div>

                {activeMenu === "user" && (
                    <div ref={dropdownRef} className="absolute right-0 top-12 bg-slate-800/95 backdrop-blur-lg border border-slate-700/60 rounded-xl p-3 flex flex-col gap-2 z-50 shadow-lg shadow-black/30 w-48">
                        {user ? (
                            <>
                                <div className="px-2 py-1 text-sm font-semibold text-sky-400 border-b border-slate-700/50 truncate">
                                    {user.firstName ? `${user.firstName} ${user.lastName || ""}` : "Welcome Back!"}
                                </div>
                                <Link
                                    to={user._id ? `/users/${user._id}` : "/account"}
                                    onClick={() => setActiveMenu(null)}
                                    className="w-full text-left text-sm text-slate-200 hover:bg-slate-700/50 px-2 py-1.5 rounded-lg transition-all"
                                >
                                    My Account
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left text-sm text-rose-400 hover:bg-rose-500/10 px-2 py-1.5 rounded-lg transition-all font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setActiveMenu(null)} className="w-full text-center bg-slate-700 text-slate-100 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-xl transition-all text-sm font-medium">
                                    Login
                                </Link>
                                <Link to="/signup" onClick={() => setActiveMenu(null)} className="w-full text-center bg-slate-700 text-slate-100 hover:bg-sky-500 hover:text-white px-4 py-2 rounded-xl transition-all text-sm font-medium">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}

                <div className="md:hidden relative" ref={mobileRef}>
                    <button onClick={() => setActiveMenu(activeMenu === "pages" ? null : "pages")} className="text-slate-200 hover:text-sky-400 transition-all flex items-center">
                        {activeMenu === "pages" ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    {activeMenu === "pages" && (
                        <div className="absolute right-0 top-12 bg-slate-800/95 backdrop-blur-lg border border-slate-700/60 rounded-xl p-4 flex flex-col gap-4 z-50 shadow-lg shadow-black/20 w-48">
                            {navLinks}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;