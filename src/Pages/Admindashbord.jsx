import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "../socket";
import events from "../../events";
import { Link } from "react-router-dom";

// React Icons
import { FiUsers, FiGrid, FiClock, FiCheckCircle } from "react-icons/fi";
import { MdOutlinePendingActions } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [view, setView] = useState("users");
    const [stats, setStats] = useState({});

    const fetchData = async (type) => {
        try {
            if (type === "users") {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/user/admin/users`,
                    { withCredentials: true }
                );

                setUsers(res.data.users);
                setStats(res.data);
                setView("users");
            }

            if (type === "projects") {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/v1/project/all`,
                    { withCredentials: true }
                );

                setProjects(res.data.Projects);
                setStats(res.data);
                setView("projects");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData("users");
    }, []);

    useEffect(() => {
        const refresh = () => {
            if (view === "users") fetchData("users");
            if (view === "projects") fetchData("projects");
        };

        socket.on(events.PROJECT_UPDATED, refresh);
        socket.on("connect", refresh);

        return () => {
            socket.off(events.PROJECT_UPDATED, refresh);
            socket.off("connect", refresh);
        };
    }, [view]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

            {/* SIDEBAR */}
            <div className="w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200 p-5">
                <h1 className="text-lg font-black text-slate-900 mb-6">
                    Admin Panel
                </h1>

                <div className="flex flex-col gap-3">

                    <button
                        onClick={() => fetchData("users")}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
                        ${view === "users"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        <FiUsers /> Users
                    </button>

                    <button
                        onClick={() => fetchData("projects")}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
                        ${view === "projects"
                                ? "bg-blue-600 text-white"
                                : "bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        <FiGrid /> Projects
                    </button>

                </div>
            </div>

            {/* MAIN */}
            <div className="flex-1 p-8 overflow-y-auto">

                {/* USERS */}
                {view === "users" && (
                    <div className="space-y-8">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Stat icon={<FiUsers />} label="Total" value={stats.Total} />
                            <Stat icon={<FiCheckCircle />} label="Admins" value={stats.Admin} />
                            <Stat icon={<BsFillLightningChargeFill />} label="Developers" value={stats.Developer} />
                            <Stat icon={<FiUsers />} label="Users" value={stats.User} />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {users.map((user) => (
                                <div key={user._id} className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition">
                                    <img
                                        src={user.image?.url}
                                        className="w-16 h-16 mx-auto rounded-full object-cover"
                                    />
                                    <h2 className="text-center font-bold mt-3">{user.name}</h2>
                                    <p className="text-center text-xs text-gray-500">{user.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PROJECTS */}
                {view === "projects" && (
                    <div className="space-y-10">

                        {/* STATS */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Stat icon={<FiGrid />} label="Total" value={stats.Total} />
                            <Stat icon={<FiCheckCircle />} label="Completed" value={stats.Completed} />
                            <Stat icon={<FiClock />} label="Building" value={stats.Building} />
                            <Stat icon={<MdOutlinePendingActions />} label="Pending" value={stats.Pending} />
                        </div>

                        {/* PROJECT CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                            {projects.map((p) => (
                                <Link
                                    to={`/projectview/${p._id}`}
                                    key={p._id}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                >

                                    {/* IMAGE */}
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={p.images?.[0]?.url}
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                        <div className="absolute top-3 left-3">
                                            <span className={`text-[10px] px-3 py-1 rounded-full text-white font-semibold
                                                ${p.endDate ? "bg-green-500" : "bg-yellow-500"}`}>
                                                {p.endDate ? "Completed" : "In Progress"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-5 space-y-2">

                                        <h2 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                                            {p.name}
                                        </h2>

                                        <p className="text-xs text-slate-500 line-clamp-2">
                                            {p.description}
                                        </p>

                                        <div className="flex justify-between text-[11px] text-slate-400 pt-3 border-t">
                                            <span>{p.startingDate || "N/A"}</span>
                                            <span>{p.endDate || "N/A"}</span>
                                        </div>

                                    </div>

                                </Link>
                            ))}

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

/* STAT COMPONENT */
const Stat = ({ icon, label, value }) => (
    <div className="bg-white rounded-xl p-4 shadow-sm border flex items-center gap-3">
        <div className="text-blue-600 text-xl">{icon}</div>
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-xl font-black text-slate-900">{value}</p>
        </div>
    </div>
);

export default AdminDashboard;