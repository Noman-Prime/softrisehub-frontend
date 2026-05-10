import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Code,
  Shield,
  Save,
  Pencil,
  X
} from "lucide-react";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ---------------- FETCH USER ---------------- */
  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/v1/user/me`,
        { withCredentials: true }
      );

      const u = res.data?.user;

      if (!u) {
        toast.error("User not found");
        return;
      }

      setUser(u);

      setFormData({
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        email: u.email || "",
        phoneNumber: u.phoneNumber || "",
        country: u.country || ""
      });

    } catch (err) {
      console.log(err?.response?.data || err.message);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  /* ---------------- UPDATE USER ---------------- */
  const updateUser = async () => {
    try {
      const res = await axios.put(
        `${API}/api/v1/user/update/${user._id}`,
        formData,
        { withCredentials: true }
      );

      const updated = res.data?.user;

      setUser(updated);
      setIsEditing(false);

      toast.success("Profile updated");

    } catch (err) {
      console.log(err?.response?.data || err.message);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#070B16]">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#070B16]">
        Not logged in
      </div>
    );
  }

  const image = user?.image?.url || "/logo.png";

  return (
    <div className="min-h-screen bg-[#070B16] flex items-center justify-center p-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#101827] to-[#0B1220] shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

        {/* HEADER */}
        <div className="relative overflow-hidden">

          {/* background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800"></div>

          {/* glow circles */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

          {/* content */}
          <div className="relative z-10 flex flex-col items-center py-10 px-6">

            {/* avatar */}
            <div className="relative group">

              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 blur-lg opacity-80 group-hover:opacity-100 transition"></div>

              <img
                src={image}
                alt="profile"
                className="relative w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* USER NAME FIXED */}
            <h2 className="mt-6 text-3xl sm:text-4xl font-extrabold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-center">
              {user.firstName} {user.lastName}
            </h2>

            {/* ROLE BADGE */}
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/30 border border-white/20 text-white text-sm font-semibold backdrop-blur-md shadow-lg">

              {user.role === "Developer" ? (
                <>
                  <Code size={16} />
                  Developer
                </>
              ) : (
                <>
                  <Shield size={16} />
                  User
                </>
              )}

            </div>

          </div>
        </div>

        {/* BODY */}
        <div className="p-6 sm:p-8 space-y-5">

          {/* NAME */}
          <Row icon={<User />} label="Name">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-blue-500"
                />

                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-blue-500"
                />
              </div>
            ) : (
              `${user.firstName} ${user.lastName}`
            )}
          </Row>

          {/* EMAIL */}
          <Row icon={<Mail />} label="Email">
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-blue-500"
              />
            ) : (
              user.email
            )}
          </Row>

          {/* PHONE */}
          <Row icon={<Phone />} label="Phone">
            {isEditing ? (
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-blue-500"
              />
            ) : (
              user.phoneNumber || "N/A"
            )}
          </Row>

          {/* COUNTRY */}
          <Row icon={<MapPin />} label="Country">
            {isEditing ? (
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl outline-none focus:border-blue-500"
              />
            ) : (
              user.country || "N/A"
            )}
          </Row>

          {/* ROLE */}
          <Row
            icon={user.role === "Developer" ? <Code /> : <Shield />}
            label="Role"
          >
            {user.role}
          </Row>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-4 justify-center pt-6">

            {isEditing ? (
              <>
                <button
                  onClick={updateUser}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  <Save size={18} />
                  Save Changes
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition"
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition"
              >
                <Pencil size={18} />
                Edit Profile
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

/* ---------------- ROW COMPONENT ---------------- */
const Row = ({ icon, label, children }) => (
  <div className="flex items-start sm:items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">

    {/* icon */}
    <div className="text-blue-400 flex-shrink-0 mt-1 sm:mt-0">
      {icon}
    </div>

    {/* label */}
    <div className="w-24 sm:w-28 text-xs font-bold tracking-[2px] uppercase text-white/50">
      {label}
    </div>

    {/* content */}
    <div className="flex-1 text-white font-medium text-sm sm:text-base break-words">
      {children || (
        <span className="text-white/40">
          N/A
        </span>
      )}
    </div>

  </div>
);

export default Profile;