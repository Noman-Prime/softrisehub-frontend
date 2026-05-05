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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditing = () => {
    setIsEditing(true);
    setShowEdit(false);
  };

  const handleDisableEdit = () => {
    setIsEditing(false);
    setShowEdit(true);
  };

  const submitt = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/update/${user?._id}`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser({ ...user, ...formData });
        toast.success("Profile updated");
      }

      handleDisableEdit();
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
      handleDisableEdit();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/me",
          { withCredentials: true }
        );

        setUser(response.data.user);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

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

          {/* NAME */}
          <Row icon={<User />} label="Name">
            {isEditing ? (
              <div className="flex gap-2 w-full">
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={user?.firstName}
                  className="w-full px-3 py-2 border rounded-xl"
                />
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={user?.lastName}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
            ) : (
              <span>{user?.firstName} {user?.lastName}</span>
            )}
          </Row>

          {/* ROLE */}
          <Row
            icon={user?.role === "developer" ? <Code /> : <Shield />}
            label="Role"
          >
            {user?.role || "Guest"}
          </Row>

          {/* EMAIL */}
          <Row icon={<Mail />} label="Email">
            {isEditing ? (
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={user?.email}
                className="w-full px-3 py-2 border rounded-xl"
              />
            ) : (
              user?.email
            )}
          </Row>

          {/* PHONE */}
          <Row icon={<Phone />} label="Phone">
            {isEditing ? (
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={user?.phoneNumber}
                className="w-full px-3 py-2 border rounded-xl"
              />
            ) : (
              user?.phoneNumber
            )}
          </Row>

          {/* COUNTRY */}
          <Row icon={<MapPin />} label="Country">
            {isEditing ? (
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder={user?.country}
                className="w-full px-3 py-2 border rounded-xl"
              />
            ) : (
              user?.country
            )}
          </Row>

          {/* ACTIONS */}
          <div className="flex justify-center gap-3 pt-4">

            {isEditing ? (
              <>
                <button
                  onClick={submitt}
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                >
                  <Save size={16} /> Save
                </button>

                <button
                  onClick={handleDisableEdit}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  <X size={16} /> Cancel
                </button>
              </>
            ) : (
              showEdit && (
                <button
                  onClick={handleEditing}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  <Pencil size={16} /> Edit Profile
                </button>
              )
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

/* ROW COMPONENT */
const Row = ({ icon, label, children }) => (
  <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
    <div className="text-blue-600">{icon}</div>
    <div className="w-24 text-xs font-semibold text-slate-400 uppercase">
      {label}
    </div>
    <div className="flex-1 text-slate-800 font-medium">
      {children}
    </div>
  </div>
);

export default Profile;