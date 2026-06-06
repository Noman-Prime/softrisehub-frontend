import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../Components/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );

      const user = res.data?.user;
      const role = user?.role;

      if (!user) {
        toast.error("Invalid response from server");
        return;
      }

      setUser(user);

      if (role === "Admin") {
        toast.success("Welcome Admin!");
        navigate("/admindashboard");
        return;
      }

      if (role === "Developer") {
        toast.success("Welcome Developer!");
        navigate("/developer/dashboard");
        return;
      }

      toast.success("Login Successful!");
      navigate("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 font-sans">
      
      {/* Left Column: Brand Context Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:col-span-5 bg-white border-r border-slate-200 p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle structural grid line background */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none grid grid-cols-3">
          <div className="border-r border-slate-100 h-full"></div>
          <div className="border-r border-slate-100 h-full"></div>
        </div>

        <div className="relative z-10">
          <span className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase">
            / SoftRiseHub Portal
          </span>
        </div>

        <div className="space-y-4 relative z-10 max-w-sm">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 leading-tight">
            Manage your digital workspace.
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Access your core services, developer tools, tracking pipelines, and platform management modules from a centralized secure console.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-400 font-medium">
          © SoftRiseHub. All rights reserved.
        </div>
      </div>

      {/* Right Column: Centered Form Context Block */}
      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 md:p-20">
        <div className="w-full max-w-md">
          
          {/* Header Block */}
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Sign In
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your authorized credentials to view dashboards.
            </p>
          </div>

          {/* Interactive Form Element */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:border-slate-900 transition duration-200 text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 pr-10 shadow-sm focus:outline-none focus:border-slate-900 transition duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold rounded-xl active:scale-[0.98] transition duration-150 text-sm shadow-[0_4px_12px_rgba(15,23,42,0.15)] cursor-pointer disabled:cursor-not-allowed flex items-center justify-center mt-2"
            >
              {isLoading ? "Verifying Context..." : "Continue to Dashboard"}
            </button>
          </form>

          {/* Navigational Anchor Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row gap-2 justify-between items-center">
            <span>Don’t have an account yet?</span>
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Create developer account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;