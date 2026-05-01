import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { toast } from "react-toastify"; 
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "" 
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const submit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );
      const userRole = response.data.user?.role

      if (userRole === "Developer") {
        toast.success("Welcome Back!");
        navigate("/developer/dashboard");
      } else if (userRole === "Admin") {
        toast.success("Welcome Back!");
        navigate("/admindashboard");
      } else {
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login Fail");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center px-4">
      <div className="flex flex-col w-100 rounded-[24px] bg-white shadow-2xl overflow-hidden  md:flex flex-col w-full max-w-[420px] rounded-[24px] bg-white shadow-2xl overflow-hidden">
        <div className="w-full bg-blue-900 py-8 flex flex-col items-center justify-center text-white">
          <LogIn size={32} className="mb-2 opacity-80" />
          <h2 className="font-bold text-2xl tracking-tight">Welcome Back</h2>
          <p className="text-blue-200 text-sm">Login to your SoftRiseHub account</p>
        </div>
        <div className="flex flex-col p-6 md:p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1"> Email Address </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="softrisehub@gmail.com"
              className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none transition-all duration-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Password
              </label>
              <Link to="/forgot-password" className="text-[10px] text-blue-600 font-bold hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-[#f3f4f6] rounded-[0.75rem] bg-white outline-none transition-all duration-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb1a]"
              />
            </div>
          </div>

          <button
            onClick={submit}
            className="w-full p-4 mt-2 bg-blue-900 text-white font-bold rounded-xl shadow-lg active:scale-95 hover:bg-blue-800 transition-all"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Signup now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;