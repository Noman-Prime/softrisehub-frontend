import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
  const [isEditing, setIsEditing] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditing = () => {
    setIsEditing(true);
    setShowEdit(false);
  };

  const handleDisableEdit = () => {
    setIsEditing(false);
    setShowEdit(true);
  };

  // 🔥 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/user/me",
        { withCredentials: true }
      );

      console.log("PROFILE DATA 👉", res.data);

      const u = res.data.user || res.data.User || res.data;

      setUser(u);

      // 🔥 IMPORTANT: sync formData
      setFormData({
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        email: u.email || "",
        phoneNumber: u.phoneNumber || "",
        country: u.country || ""
      });

    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔥 UPDATE PROFILE
  const submitt = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/user/update/${user?._id}`,
        formData,
        { withCredentials: true }
      );

      console.log("UPDATE RESPONSE 👉", res.data);

      const updatedUser = res.data.user || res.data.User;

      setUser(updatedUser);

      toast.success("Profile updated");

      handleDisableEdit();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
      handleDisableEdit();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">

          <img
            src={user?.image?.url || "/logo.png"}
            className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/30 shadow-lg"
          />

          <h2 className="mt-4 text-xl font-bold">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="text-sm text-white/80 mt-1">
            {user?.isActive ? "Active User" : "Inactive User"}
          </p>
        </div>

        {/* BODY */}
        <div className="p-8 space-y-5">

          <Row icon={<User />} label="Name">
            {isEditing ? (
              <div className="flex gap-2 w-full">
                <input name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border rounded-xl" />
                <input name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border rounded-xl" />
              </div>
            ) : (
              `${user?.firstName} ${user?.lastName}`
            )}
          </Row>

          <Row icon={user?.role === "developer" ? <Code /> : <Shield />} label="Role">
            {user?.role || "Guest"}
          </Row>

          <Row icon={<Mail />} label="Email">
            {isEditing ? (
              <input name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-xl" />
            ) : (
              user?.email
            )}
          </Row>

          <Row icon={<Phone />} label="Phone">
            {isEditing ? (
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-3 py-2 border rounded-xl" />
            ) : (
              user?.phoneNumber
            )}
          </Row>

          <Row icon={<MapPin />} label="Country">
            {isEditing ? (
              <input name="country" value={formData.country} onChange={handleChange} className="w-full px-3 py-2 border rounded-xl" />
            ) : (
              user?.country
            )}
          </Row>

          {/* ACTIONS */}
          <div className="flex justify-center gap-3 pt-4">

            {isEditing ? (
              <>
                <button onClick={submitt} className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-xl">
                  <Save size={16} /> Save
                </button>

                <button onClick={handleDisableEdit} className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-xl">
                  <X size={16} /> Cancel
                </button>
              </>
            ) : (
              showEdit && (
                <button onClick={handleEditing} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl">
                  <Pencil size={16} /> Edit
                </button>
              )
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

const Row = ({ icon, label, children }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border">
    <div className="text-blue-600">{icon}</div>
    <div className="w-24 text-xs font-semibold text-slate-400 uppercase">
      {label}
    </div>
    <div className="flex-1 font-medium text-slate-800">
      {children}
    </div>
  </div>
);

export default Profile;