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

      <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl shadow-2xl">

        {/* HEADER */}
        <div className="relative p-10 text-center bg-gradient-to-br from-blue-600/90 to-indigo-700/90">

          {/* glow overlay */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-xl"></div>

          {/* avatar */}
          <div className="relative w-fit mx-auto">

            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 blur-md opacity-70"></div>

            <img
              src={image}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/20 shadow-2xl hover:scale-105 transition"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white">
            {user.firstName} {user.lastName}
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white/90">
            {user.role === "Developer" ? "🧑‍💻 Developer" : "🛡️ User"}
          </div>

        </div>

        {/* BODY */}
        <div className="p-6 space-y-4">

          <Row icon={<User />} label="Name">
            {isEditing ? (
              <div className="flex gap-2 w-full">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 bg-white/5 border border-white/10 text-white rounded-xl outline-none"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 bg-white/5 border border-white/10 text-white rounded-xl outline-none"
                />
              </div>
            ) : (
              `${user.firstName} ${user.lastName}`
            )}
          </Row>

          <Row icon={<Mail />} label="Email">
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 text-white rounded-xl outline-none"
              />
            ) : (
              user.email
            )}
          </Row>

          <Row icon={<Phone />} label="Phone">
            {isEditing ? (
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 text-white rounded-xl outline-none"
              />
            ) : (
              user.phoneNumber || "N/A"
            )}
          </Row>

          <Row icon={<MapPin />} label="Country">
            {isEditing ? (
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full p-2 bg-white/5 border border-white/10 text-white rounded-xl outline-none"
              />
            ) : (
              user.country || "N/A"
            )}
          </Row>

          <Row icon={user.role === "Developer" ? <Code /> : <Shield />} label="Role">
            {user.role}
          </Row>

          {/* ACTIONS */}
          <div className="flex gap-3 justify-center pt-4">

            {isEditing ? (
              <>
                <button
                  onClick={updateUser}
                  className="px-4 py-2 bg-green-500 rounded-xl flex items-center gap-2"
                >
                  <Save size={16} /> Save
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-red-500 rounded-xl flex items-center gap-2"
                >
                  <X size={16} /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 rounded-xl flex items-center gap-2"
              >
                <Pencil size={16} /> Edit
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

/* ---------------- ROW COMPONENT (FIXED VISIBILITY) ---------------- */
const Row = ({ icon, label, children }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">

    <div className="text-blue-400 flex-shrink-0">
      {icon}
    </div>

    <div className="w-28 text-xs font-semibold tracking-widest uppercase text-white/40">
      {label}
    </div>

    <div className="flex-1 text-white font-medium text-sm sm:text-base break-words">
      {children || <span className="text-white/40">N/A</span>}
    </div>

  </div>
);

export default Profile;