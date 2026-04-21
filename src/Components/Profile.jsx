import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Phone, MapPin, Users, Code, Shield, Save, Pencil, X } from "lucide-react";

const Profile = () => {
  const [showEdit, setShowEdit] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    country: ""
  })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleEditing = () => {
    setIsEditing(true)
    setShowEdit(false)
  }
  const handleDisableEdit = () =>{
    setIsEditing(false)
    setShowEdit(true)
  }
  const submitt = async () => {
    try {
      const responce = await axios.put(`http://localhost:3000/api/v1/user/update/${user?._id}`, formData, { withCredentials: true })
      console.log(responce)
      if (responce.data.success) {
        setUser({
          ...user,
          ...formData
        })
      }
      toast.success("Account is updated")
      handleDisableEdit()
    } catch (error) {
      console.error(error);
      toast.error("Account is not updated")
      handleDisableEdit()
    }
  }
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center px-4">
      <div className="w-full w-lg bg-white rounded-[24px] shadow-2xl overflow-hidden">
        <div className="bg-blue-900 py-8 flex flex-col items-center text-white">
          <div className="w-24 h-24 bg-blue-800 rounded-full flex items-center justify-center mb-4 border-4 border-blue-700">
            <img src={user?.image?.url || "./logo.png"} alt="Logo" className="w-22 h-22 rounded-full border border-black object-cover" />
          </div>
          <div className="flex gap-4">
            {user?.isActive ? (
              <span className=" text-green-400 font-bold text-2xl">Active</span>
            ) : (
              <span className=" text-red-400 font-bold text-2xl">InActive</span>
            )
            }
          </div>
        </div>

        <div className="flex justify-between items-start p-6 md:p-8 space-y-6">
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-4 text-blue-600">
              <User />
              {isEditing ? (
                <div className="flex flex-row gap-4">
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder={user?.firstName} className="border rounded px-2 py-1 text-black" />
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder={user?.lastName} className="border rounded px-2 py-1 text-black" />
                </div>

              ) : (
                <h2 className="font-bold text-2xl">
                  <span> {user?.firstName} </span>
                  <span> {user?.lastName} </span>
                </h2>
              )
              }
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              {user?.role === "developer" ? (
                <>
                  <Code className="text-blue-600" />
                  <span>{user.role}</span>
                </>
              ) : user?.role === "admin" ? (
                <>
                  <Shield className="text-blue-600" />
                  <span>{user.role}</span>
                </>
              ) : (
                <>
                  <User className="text-blue-600" />
                  <span>{user?.role || "Guest"}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <Mail className="text-blue-600" />
              {isEditing ? (
                <>
                  <input name="email" value={formData.email} onChange={handleChange} placeholder={user?.email} className="border rounded px-2 py-1 text-black" />
                </>
              ) : (
                <span>{user?.email}</span>
              )
              }
            </div>

            <div className="flex items-center gap-4 py-2 text-gray-600">
              <Phone className="text-blue-600" />
              {isEditing ? (
                <div>
                  <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder={user?.phoneNumber} className="border rounded px-2 py-1 text-black" />
                </div>
              ) : (
                <>
                  <span>{user?.phoneNumber}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <MapPin className="text-blue-600" />
              {isEditing ? (
                <>
                  <input name="country" value={formData.country} onChange={handleChange} placeholder={user?.country} className="border rounded px-2 py-1 text-black" />
                </>
              ) : (
                <span>{user?.country}</span>
              )
              }
            </div>
            <div className="flex items-center justify-center py-2 gap-2 ">
              {isEditing && (
                <>
                <button className="flex items-center justify-center border-2 rounded-[10px] flex-row px-4 py-2 gap-2 hover:bg-green-600 cursor-pointer" onClick={submitt}>
                  <span>Save Changes</span>
                  <Save size={18} />
                </button>
                <buuton className="flex items-center gap-2 hover:bg-green-600 justify-center px-4 py-2 border-2 rounded-[10px]" onClick={handleDisableEdit}>
              <X size={20} className="text-red-600  hover:rounded-full transition-colors cursor-pointer" />
              <span>Cancel</span>
              </buuton>
                </>
              )}
            </div>
          </div>

          <div>
          
            {showEdit ? (
              <button className="px-4 py-2" onClick={handleEditing}>
              <Pencil size={20} className="hover:text-blue-600 cursor-pointer" />
              </button>
            ) : (<></>
            )}
          </div>
        </div>

      </div>
    </div >

  );
};

export default Profile;