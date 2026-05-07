import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "../socket";
import { Link } from "react-router-dom";
import Packages from "./Packages"; // Ensure this file exists in the same folder

// React Icons
import { FiUsers, FiGrid, FiClock, FiCheckCircle, FiPackage, FiPlus, FiX } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [packages, setPackages] = useState([]);
    const [view, setView] = useState("users");
    const [stats, setStats] = useState({});
    const [showAddPackage, setShowAddPackage] = useState(false);

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

    useEffect(() => {
        fetchData("users");
    }, []);

    useEffect(() => {
        const refresh = () => {
            if (view === "users") fetchData("users");
            if (view === "projects") fetchData("projects");
            if (view === "packages") fetchData("packages");
        };

        // Used direct string "PROJECT_UPDATED" to avoid the 'events' module error
        socket.on("PROJECT_UPDATED", refresh);
        socket.on("connect", refresh);

        return () => {
            socket.off("PROJECT_UPDATED", refresh);
            socket.off("connect", refresh);
        };
    }, [view]);

    return (
        <div className="flex min-h-screen bg-slate-50 relative">
            
            {/* ADD PACKAGE MODAL */}
            {showAddPackage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-md p-4">
                    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button 
                            onClick={() => { setShowAddPackage(false); fetchData("packages"); }}
                            className="absolute top-6 right-6 z-10 p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                            <FiX size={20} />
                        </button>
                        <Packages /> 
                    </div>
                </div>
            )}

            {/* SIDEBAR */}
            <div className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Admin Hub</h1>
                
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

            {/* MAIN AREA */}
            <main className="flex-1 p-10 overflow-y-auto">
                
                {/* USER VIEW */}
                {view === "users" && (
                    <div className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <StatCard icon={<FiUsers />} label="Total Users" value={stats.Total} color="text-blue-600" />
                            <StatCard icon={<FiCheckCircle />} label="Admins" value={stats.Admin} color="text-emerald-600" />
                            <StatCard icon={<BsFillLightningChargeFill />} label="Devs" value={stats.Developer} color="text-amber-500" />
                            <StatCard icon={<FiUsers />} label="Clients" value={stats.User} color="text-slate-600" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {users.map(u => <UserCard key={u._id} user={u} />)}
                        </div>
                    </div>
                )}

                {/* PROJECT VIEW */}
                {view === "projects" && (
                    <div className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                            <StatCard icon={<FiGrid />} label="Total" value={stats.Total} color="text-indigo-600" />
                            <StatCard icon={<FiCheckCircle />} label="Done" value={stats.Completed} color="text-emerald-600" />
                            <StatCard icon={<FiClock />} label="Active" value={stats.Building} color="text-sky-500" />
                            <StatCard icon={<MdOutlinePendingActions />} label="Pending" value={stats.Pending} color="text-rose-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {projects.map(p => <ProjectCard key={p._id} p={p} />)}
                        </div>
                    </div>
                )}

                {/* PACKAGE VIEW */}
                {view === "packages" && (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">Service Plans</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* ADD BUTTON CARD */}
                            <div 
                                onClick={() => setShowAddPackage(true)}
                                className="group border-2 border-dashed border-slate-300 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all"
                            >
                                <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl group-hover:scale-110 transition">
                                    <FiPlus size={28} />
                                </div>
                                <span className="font-bold text-slate-500 group-hover:text-blue-600">New Package</span>
                            </div>

                            {packages.map(pkg => (
                                <div key={pkg._id} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                                    <div className="flex justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">{pkg.type}</span>
                                        <span className="text-xl font-bold text-slate-900">${pkg.price}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mt-4">{pkg.name}</h3>
                                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">{pkg.details}</p>
                                    <div className="mt-6 flex items-center gap-4 text-xs font-semibold text-slate-400">
                                        <span className="flex items-center gap-1"><FiGrid size={12}/> {pkg.pages}</span>
                                        <span className="flex items-center gap-1"><FiClock size={12}/> {pkg.timeline}</span>
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

/* COMPONENTS */

const SidebarItem = ({ active, icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
        ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
    >
        {icon} {label}
    </button>
);

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className={`${color} text-2xl bg-slate-50 p-3 rounded-xl`}>{icon}</div>
        <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">{label}</p>
            <p className="text-2xl font-black text-slate-900">{value || 0}</p>
        </div>
    </div>
);

const UserCard = ({ user }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-md transition">
        <img src={user.image?.url} className="w-16 h-16 rounded-full object-cover border-4 border-slate-50" alt={user.name} />
        <h3 className="mt-4 font-bold text-slate-800 text-center">{user.name}</h3>
        <p className="text-xs text-slate-400">{user.email}</p>
    </div>
);

const ProjectCard = ({ p }) => (
    <Link to={`/projectview/${p._id}`} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
            <img src={p.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={p.name} />
            <div className="absolute top-4 left-4">
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full text-white uppercase shadow-lg ${p.endDate ? "bg-emerald-500" : "bg-blue-500"}`}>
                    {p.endDate ? "Completed" : "In Progress"}
                </span>
            </div>
        </div>
        <div className="p-6">
            <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition">{p.name}</h3>
            <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
        </div>
    </Link>
);

export default AdminDashboard;