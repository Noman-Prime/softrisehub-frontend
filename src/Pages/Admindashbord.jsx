import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const API = import.meta.env.VITE_API_URL;

  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [packages, setPackages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  const resetStats = () => {
    setStats({});
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      resetStats();

      const { data } = await axios.get(
        `${API}/api/v1/user/admin/users`,
        { withCredentials: true }
      );

      const list = data?.users || [];
      const roleStats = {
        total: list.length,
        admin: 0,
        developer: 0,
        user: 0,
      };

      list.forEach((u) => {
        const role = (u.role || "").toLowerCase().trim();
        if (role === "admin") roleStats.admin++;
        else if (role === "developer") roleStats.developer++;
        else roleStats.user++;
      });

      setUsers(list);
      setStats(roleStats);
      setView("users");
    } catch (err) {
      console.log("USERS ERROR:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      resetStats();

      const { data } = await axios.get(
        `${API}/api/v1/project/all`,
        { withCredentials: true }
      );

      const list = data?.Projects || [];
      const projectStats = {
        total: list.length,
        pending: 0,
        building: 0,
        completed: 0,
        cancelled: 0,
      };

      list.forEach((p) => {
        const status = (p.status || "").toLowerCase().trim();
        if (status.includes("pending")) projectStats.pending++;
        else if (
          status.includes("build") ||
          status.includes("progress") ||
          status.includes("working")
        ) {
          projectStats.building++;
        } else if (
          status.includes("complete") ||
          status.includes("done") ||
          status.includes("finished")
        ) {
          projectStats.completed++;
        } else if (status.includes("cancel")) {
          projectStats.cancelled++;
        }
      });

      setProjects(list);
      setStats(projectStats);
      setView("projects");
    } catch (err) {
      console.log("PROJECTS ERROR:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      resetStats();

      const { data } = await axios.get(
        `${API}/api/v1/package/findAll`,
        { withCredentials: true }
      );

      setPackages(data?.packages || []);
      setView("packages");
    } catch (err) {
      console.log("PACKAGES ERROR:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full min-h-screen flex bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div className="w-full p-6">
          <div className="mb-8">
            <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase block">
              SoftRiseHub
            </span>
            <span className="text-[10px] font-mono text-slate-400 block mt-0.5 uppercase tracking-wider">
              Management Console
            </span>
          </div>

          <nav className="space-y-1 w-full">
            <button
              onClick={fetchUsers}
              className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg transition ${
                view === "users"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Users
            </button>

            <button
              onClick={fetchProjects}
              className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg transition ${
                view === "projects"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Projects
            </button>

            <button
              onClick={fetchPackages}
              className={`w-full text-left px-3 py-2.5 text-sm font-bold rounded-lg transition ${
                view === "packages"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Packages
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100 text-[10px] font-mono text-slate-400">
          SYSTEM_STATUS: OK
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 min-w-0 p-8 sm:p-10 lg:p-12 overflow-y-auto">
        
        {/* VIEW HEADER */}
        <div className="w-full flex justify-between items-center mb-8 border-b border-slate-200 pb-5">
          <div className="min-w-0">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight capitalize">
              {view} Overview
            </h1>
          </div>
          {loading && (
            <span className="text-xs font-mono text-slate-400 animate-pulse">
              SYNCING_DATA...
            </span>
          )}
        </div>

        {/* ================= USERS CONTAINER ================= */}
        {view === "users" && (
          <div className="w-full space-y-8">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat label="Total Users" value={stats.total} />
              <Stat label="Administrators" value={stats.admin} />
              <Stat label="Developers" value={stats.developer} />
              <Stat label="Standard Accounts" value={stats.user} />
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {users.map((u) => (
                <Link
                  key={u._id}
                  to={`/users/${u._id}`}
                  className="w-full min-w-0 bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm hover:border-slate-300 transition text-center flex flex-col items-center"
                >
                  <img
                    src={u.image?.url || "/logo.png"}
                    alt={u.firstName}
                    className="w-16 h-16 rounded-full object-cover bg-slate-100 border border-slate-200 mb-3"
                  />
                  <p className="w-full text-sm font-bold text-slate-900 tracking-tight truncate">
                    {u.firstName}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-500 border border-slate-200 rounded-md">
                    {u.role}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ================= PROJECTS CONTAINER ================= */}
        {view === "projects" && (
          <div className="w-full space-y-8">
            <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Stat label="Total Systems" value={stats.total} />
              <Stat label="Pending Validation" value={stats.pending} />
              <Stat label="Active Build" value={stats.building} />
              <Stat label="Completed" value={stats.completed} />
              <Stat label="Cancelled" value={stats.cancelled} />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <Link
                  key={p._id}
                  to={`/projectview/${p._id}`}
                  className="w-full min-w-0 bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm hover:border-slate-300 transition flex flex-col justify-between"
                >
                  <div className="w-full">
                    {p.images?.[0]?.url ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        className="h-40 w-full object-cover border-b border-slate-100"
                      />
                    ) : (
                      <div className="h-40 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center text-xs text-slate-400 font-mono">
                        NO_IMAGE_ATTACHED
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-slate-900 tracking-tight truncate">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 border border-slate-200 rounded-md">
                      {p.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ================= PACKAGES CONTAINER ================= */}
        {view === "packages" && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <Link
                key={pkg._id}
                to={`/packages/${pkg._id}`}
                className="w-full min-w-0 bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div className="w-full min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 block mb-1">
                    {pkg.type}
                  </span>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight truncate">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed mt-2 line-clamp-3">
                    {pkg.details}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900">
                    ${pkg.price}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    USD
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

/* ---------------- REFINED STAT SUB-COMPONENT ---------------- */
const Stat = ({ label, value }) => (
  <div className="w-full min-w-0 bg-white border border-slate-200/80 p-5 rounded-xl shadow-sm text-left">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate mb-1">
      {label}
    </p>
    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
      {value || 0}
    </h2>
  </div>
);

export default AdminDashboard;