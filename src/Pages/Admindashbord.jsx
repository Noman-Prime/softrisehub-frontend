import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "../socket";
import { Link } from "react-router-dom";
import Packages from "./Packages"; // Ensure this component is in the same folder

// React Icons
import { 
    FiUsers, 
    FiGrid, 
    FiClock, 
    FiCheckCircle, 
    FiPackage, 
    FiPlus, 
    FiX 
} from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";

const AdminDashboard = () => {
    // 1. State Management
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [packages, setPackages] = useState([]);
    const [view, setView] = useState("users");
    const [stats, setStats] = useState({});
    const [showAddPackage, setShowAddPackage] = useState(false);

    // 2. Optimized Data Fetching
    const fetchData = async (type) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL;
            
            if (type === "users") {
                const res = await axios.get(`${baseUrl}/api/v1/user/admin/users`, { withCredentials: true });
                setUsers(res.data.users || []);
                setStats(res.data);
                setView("users");
            }

            if (type === "projects") {
                const res = await axios.get(`${baseUrl}/api/v1/project/all`, { withCredentials: true });
                setProjects(res.data.Projects || []);
                setStats(res.data);
                setView("projects");
            }

            if (type === "packages") {
                const res = await axios.get(`${baseUrl}/api/v1/package/find-all`, { withCredentials: true });
                setPackages(res.data.packages || []);
                setView("packages");
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

    // 3. Initial Load
    useEffect(() => {
        fetchData("users");
    }, []);

    // 4. Socket Listeners (Using Strings to avoid 'events' module error)
    useEffect(() => {
        const refresh = () => {
            if (view === "users") fetchData("users");
            if (view === "projects") fetchData("projects");
            if (view === "packages") fetchData("packages");
        };

        socket.on("PROJECT_UPDATED", refresh);
        socket.on("connect", refresh);

        return () => {
            socket.off("PROJECT_UPDATED", refresh);
            socket.off("connect", refresh);
        };
    }, [view]);

    return (
        <div className="flex min-h-screen bg-slate-50 relative">
            
            {/* ADD PACKAGE MODAL (Appears on top of everything) */}
            {showAddPackage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto animate-in zoom-in duration-300">
                        <button 
                            onClick={() => { setShowAddPackage(false); fetchData("packages"); }}
                            className="absolute top-6 right-6 z-10 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                            <FiX size={20} />
                        </button>
                        <Packages /> 
                    </div>
                </div>
            )}

            {/* SIDEBAR */}
            <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 p-6 flex flex-col gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black">S</div>
                    <h1 className="text-lg font-black text-slate-900 tracking-tight">Admin Panel</h1>
                </div>

                <nav className="flex flex-col gap-2">
                    <SidebarItem 
                        active={view === "users"} 
                        icon={<FiUsers />} 
                        label="Users" 
                        onClick={() => fetchData("users")} 
                    />
                    <SidebarItem 
                        active={view === "projects"} 
                        icon={<FiGrid />} 
                        label="Projects" 
                        onClick={() => fetchData("projects")} 
                    />
                    <SidebarItem 
                        active={view === "packages"} 
                        icon={<FiPackage />} 
                        label="Packages" 
                        onClick={() => fetchData("packages")} 
                    />
                </nav>
            </div>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 p-10 overflow-y-auto">
                
                {/* 1. USERS VIEW */}
                {view === "users" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <StatCard icon={<FiUsers />} label="Total" value={stats.Total} color="text-blue-600" />
                            <StatCard icon={<FiCheckCircle />} label="Admins" value={stats.Admin} color="text-emerald-600" />
                            <StatCard icon={<BsFillLightningChargeFill />} label="Developers" value={stats.Developer} color="text-indigo-500" />
                            <StatCard icon={<FiUsers />} label="Clients" value={stats.User} color="text-slate-500" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {users.map(u => <UserCard key={u._id} user={u} />)}
                        </div>
                    </div>
                )}

                {/* 2. PROJECTS VIEW */}
                {view === "projects" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <StatCard icon={<FiGrid />} label="Total" value={stats.Total} color="text-blue-600" />
                            <StatCard icon={<FiCheckCircle />} label="Completed" value={stats.Completed} color="text-emerald-600" />
                            <StatCard icon={<FiClock />} label="In Progress" value={stats.Building} color="text-amber-500" />
                            <StatCard icon={<MdOutlinePendingActions />} label="Pending" value={stats.Pending} color="text-rose-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map(p => <ProjectCard key={p._id} p={p} />)}
                        </div>
                    </div>
                )}

                {/* 3. PACKAGES VIEW */}
                {view === "packages" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Service Packages</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ADD NEW PACKAGE TRIGGER CARD */}
                            <div 
                                onClick={() => setShowAddPackage(true)}
                                className="group border-2 border-dashed border-slate-300 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-300 min-h-[220px]"
                            >
                                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl group-hover:scale-110 transition duration-300 shadow-sm shadow-blue-200">
                                    <FiPlus size={28} />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-slate-800 group-hover:text-blue-600">Add New Service</p>
                                    <p className="text-xs text-slate-400 mt-1">Create a new pricing plan</p>
                                </div>
                            </div>

                            {/* LIST OF PACKAGES */}
                            {packages.map(pkg => (
                                <div key={pkg._id} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{pkg.type}</span>
                                        <p className="text-2xl font-black text-slate-900">${pkg.price}</p>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mt-6 group-hover:text-blue-600 transition">{pkg.name}</h3>
                                    <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">{pkg.details}</p>
                                    
                                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
                                            <span className="flex items-center gap-1.5"><FiGrid size={14}/> {pkg.pages} Pages</span>
                                            <span className="flex items-center gap-1.5"><FiClock size={14}/> {pkg.timeline}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

/* REUSABLE UI COMPONENTS */

const SidebarItem = ({ active, icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300
        ${active ? "bg-blue-600 text-white shadow-xl shadow-blue-200" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
    >
        <span className={active ? "scale-110" : ""}>{icon}</span>
        {label}
    </button>
);

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition">
        <div className={`${color} text-2xl bg-slate-50 p-4 rounded-2xl`}>{icon}</div>
        <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] mb-1">{label}</p>
            <p className="text-2xl font-black text-slate-900 leading-none">{value || 0}</p>
        </div>
    </div>
);

const UserCard = ({ user }) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-lg transition duration-300">
        <img 
            src={user.image?.url} 
            className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-inner" 
            alt={user.name} 
        />
        <h3 className="mt-4 font-bold text-slate-800 text-center">{user.name}</h3>
        <p className="text-xs text-slate-400 font-medium">{user.email}</p>
    </div>
);

const ProjectCard = ({ p }) => (
    <Link to={`/projectview/${p._id}`} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="relative h-52 overflow-hidden">
            <img src={p.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={p.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="absolute top-5 left-5">
                <span className={`text-[10px] font-black px-4 py-1.5 rounded-full text-white uppercase shadow-lg backdrop-blur-md ${p.endDate ? "bg-emerald-500/90" : "bg-blue-600/90"}`}>
                    {p.endDate ? "Completed" : "In Progress"}
                </span>
            </div>
        </div>
        <div className="p-7">
            <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition text-lg leading-tight">{p.name}</h3>
            <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">{p.description}</p>
        </div>
    </Link>
);

export default AdminDashboard;