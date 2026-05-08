import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const API = import.meta.env.VITE_API_URL;

  const [view, setView] = useState("users");

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [packages, setPackages] = useState([]);

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  /* ---------------- RESET STATS ---------------- */
  const resetStats = () => {
    setStats({});
  };

  /* ---------------- USERS ---------------- */
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

  /* ---------------- PROJECTS ---------------- */
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
        }
        else if (
          status.includes("complete") ||
          status.includes("done") ||
          status.includes("finished")
        ) {
          projectStats.completed++;
        }
        else if (status.includes("cancel")) {
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

  /* ---------------- PACKAGES ---------------- */
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

  /* ---------------- UI ---------------- */
  return (
    <div className="flex min-h-screen bg-[#050814] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0A0F1C] p-5 border-r border-white/10">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <button onClick={fetchUsers} className="block mb-3 hover:text-blue-400">
          Users
        </button>

        <button onClick={fetchProjects} className="block mb-3 hover:text-blue-400">
          Projects
        </button>

        <button onClick={fetchPackages} className="block hover:text-blue-400">
          Packages
        </button>
      </div>

      {/* MAIN */}
      <main className="flex-1 p-6">

        {loading && (
          <p className="text-white/60 mb-4">Loading...</p>
        )}

        {/* ================= USERS ================= */}
        {view === "users" && (
          <>
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Stat label="Total Users" value={stats.total} />
              <Stat label="Admins" value={stats.admin} />
              <Stat label="Developers" value={stats.developer} />
              <Stat label="Users" value={stats.user} />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {users.map((u) => (
                <Link
                  key={u._id}
                  to={`/users/${u._id}`}
                  className="bg-white/5 p-5 rounded-xl hover:bg-white/10"
                >
                  <img
                    src={u.image?.url || "/logo.png"}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                  <p className="text-center mt-2 font-bold">
                    {u.firstName}
                  </p>
                  <p className="text-center text-xs text-white/60">
                    {u.role}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ================= PROJECTS ================= */}
        {view === "projects" && (
          <>
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Stat label="Total" value={stats.total} />
              <Stat label="Pending" value={stats.pending} />
              <Stat label="Building" value={stats.building} />
              <Stat label="Completed" value={stats.completed} />
              <Stat label="Cancelled" value={stats.cancelled} />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {projects.map((p) => (
                <Link
                  key={p._id}
                  to={`/projectview/${p._id}`}
                  className="bg-white/5 p-4 rounded-xl hover:bg-white/10"
                >
                  <img
                    src={p.images?.[0]?.url}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <p className="mt-2 font-bold">{p.name}</p>
                  <p className="text-xs text-white/60">{p.status}</p>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ================= PACKAGES ================= */}
        {view === "packages" && (
          <div className="grid md:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <Link
                key={pkg._id}
                to={`/packages/${pkg._id}`}
                className="bg-white/5 p-5 rounded-xl hover:bg-white/10"
              >
                <h3 className="font-bold text-lg">{pkg.name}</h3>
                <p className="text-sm text-white/60">{pkg.type}</p>
                <p className="text-xs text-white/50 mt-2">
                  {pkg.details}
                </p>
                <p className="mt-3 text-blue-400 font-bold">
                  ${pkg.price}
                </p>
              </Link>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

/* ---------------- STAT COMPONENT ---------------- */
const Stat = ({ label, value }) => (
  <div className="bg-white/5 p-4 rounded-xl text-center">
    <p className="text-xs text-white/60">{label}</p>
    <h2 className="text-2xl font-bold">{value || 0}</h2>
  </div>
);

export default AdminDashboard;