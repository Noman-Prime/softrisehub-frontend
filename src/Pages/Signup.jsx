import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    country: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        formData,
        { withCredentials: true }
      );
      const userRole = response.data.user?.role;
      if (userRole === "User") {
        toast.success("Account Created!");
        navigate("/");
      } 
    }catch (error) {
        toast.error("Registration Failed");
      }
    };

    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center px-4 py-10">
        {/* Changed: Used w-full with max-w-[420px] to prevent mobile overflow */}
        <div className="flex flex-col w-full max-w-[420px] rounded-[24px] bg-white shadow-2xl overflow-hidden">
          <div className="w-full bg-blue-900 py-8 flex flex-col items-center justify-center text-white">
            <UserPlus size={32} className="mb-2 opacity-80" />
            <h2 className="font-bold text-2xl tracking-tight">Join SoftRiseHub</h2>
            <p className="text-blue-200 text-sm">Create your professional account</p>
          </div>

          <div className="flex flex-col p-6 md:p-8 gap-5">
            <div className="flex flex-col w-full md:space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> First Name </label>
              {/* Changed: w-80 to w-full */}
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jhon" className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]" />

              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> Last Name </label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Adams" className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]" />

              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> Email Address </label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="softrisehub@mail.com" className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]" />

              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> Password </label>
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]" />

              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> Phone Number </label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+1 3XX-XXXXXXX" className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]" />

              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> Country </label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="United States" className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]" />
            </div>

            {/* Changed: w-80 to w-full */}
            <button onClick={handleSubmit} className="w-full p-4 mt-4 bg-blue-900 text-white font-bold rounded-xl shadow-lg active:scale-95 hover:bg-blue-800 transition-all">
              Create Account
            </button>
          </div>

          <div className="text-center pb-8 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  };

  export default Signup;