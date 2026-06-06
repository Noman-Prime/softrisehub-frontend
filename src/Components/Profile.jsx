import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { User, Mail, Phone, MapPin, Code, Shield, Save, Pencil, X } from "lucide-react";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", country: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/v1/user/me`, { withCredentials: true });
      const u = res.data?.user;
      if (!u) { toast.error("User not found"); return; }
      setUser(u);
      setFormData({ firstName: u.firstName || "", lastName: u.lastName || "", email: u.email || "", phoneNumber: u.phoneNumber || "", country: u.country || "" });
    } catch (err) {
      console.log(err?.response?.data || err.message);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const updateUser = async () => {
    try {
      const res = await axios.put(`${API}/api/v1/user/update/${user._id}`, formData, { withCredentials: true });
      const updated = res.data?.user;
      setUser(updated);
      setIsEditing(false);
      toast.success("Profile updated");
    } catch (err) {
      console.log(err?.response?.data || err.message);
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-600 bg-slate-50">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-slate-600 bg-slate-50">Not logged in</div>;

  const image = user?.image?.url || "/logo.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-slate-50 to-sky-50/30 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl rounded-3xl overflow-hidden border border-sky-100 bg-white shadow-xl shadow-sky-100/40">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600"></div>
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-sky-200/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex flex-col items-center py-8 sm:py-10 px-4 sm:px-6">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white via-sky-200 to-white blur-md opacity-70 group-hover:opacity-100 transition"></div>
              <img src={image} alt="profile" className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-xl transition-transform duration-300 group-hover:scale-105" />
            </div>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-4xl font-bold text-white tracking-wide drop-shadow-sm text-center line-clamp-2 max-w-full px-2">{user.firstName} {user.lastName}</h2>
            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-semibold backdrop-blur-md shadow-sm">
              {user.role === "Developer" ? <Code size={16} /> : <Shield size={16} />}
              <span className="capitalize">{user.role || "User"}</span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-8 space-y-4 sm:space-y-5 bg-white">
          <Row icon={<User />} label="Name">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full p-2.5 sm:p-3 bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base rounded-xl outline-none focus:border-blue-500 focus:bg-white transition" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full p-2.5 sm:p-3 bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base rounded-xl outline-none focus:border-blue-500 focus:bg-white transition" />
              </div>
            ) : `${user.firstName} ${user.lastName}`}
          </Row>
          <Row icon={<Mail />} label="Email">
            {isEditing ? <input name="email" value={formData.email} onChange={handleChange} className="w-full p-2.5 sm:p-3 bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base rounded-xl outline-none focus:border-blue-500 focus:bg-white transition" /> : user.email}
          </Row>
          <Row icon={<Phone />} label="Phone">
            {isEditing ? <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2.5 sm:p-3 bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base rounded-xl outline-none focus:border-blue-500 focus:bg-white transition" /> : user.phoneNumber || "N/A"}
          </Row>
          <Row icon={<MapPin />} label="Country">
            {isEditing ? <input name="country" value={formData.country} onChange={handleChange} className="w-full p-2.5 sm:p-3 bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base rounded-xl outline-none focus:border-blue-500 focus:bg-white transition" /> : user.country || "N/A"}
          </Row>
          <Row icon={user.role === "Developer" ? <Code /> : <Shield />} label="Role" className="capitalize">{user.role}</Row>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
            {isEditing ? (
              <>
                <button onClick={updateUser} className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition"><Save size={18} />Save Changes</button>
                <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition"><X size={18} />Cancel</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-sky-600 text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition"><Pencil size={18} />Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ icon, label, children }) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all duration-300">
    <div className="flex items-center gap-3 sm:contents">
      <div className="text-blue-500 flex-shrink-0">{icon}</div>
      <div className="w-24 sm:w-28 text-[10px] sm:text-xs font-bold tracking-[2px] uppercase text-slate-400">{label}</div>
    </div>
    <div className="flex-1 text-slate-700 font-medium text-sm sm:text-base break-words min-w-0 pl-7 sm:pl-0">{children || <span className="text-slate-300">N/A</span>}</div>
  </div>
);

export default Profile;


{/*this profile is not completed */}