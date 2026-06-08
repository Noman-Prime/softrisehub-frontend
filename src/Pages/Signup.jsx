import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/signup`, { ...formData }, { withCredentials: true });
      console.log(response.data);
      if (response.data) {
        navigate("/");
        toast.success("Account created successfully!")
      }
    } catch (error) {
      console.log(error.response.data?.message);
      toast.error(error.response.data?.message)
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-50 font-sans antialiased">
      <div className="hidden lg:flex lg:col-span-5 bg-white border-r border-slate-100 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3] pointer-events-none grid grid-cols-3">
          <div className="border-r border-slate-100 h-full"></div>
          <div className="border-r border-slate-100 h-full"></div>
        </div>

        <div className="relative z-2">
          <span className="text-xs font-bold tracking-[0.2em] text-[#2B3F43] uppercase">
            / SoftRiseHub Registration
          </span>
        </div>

        <div className="space-y-4 relative z-10 max-w-sm">
          <h1 className="text-3xl font-black tracking-tight text-[#2B3F43] leading-tight">
            Build and deploy commercial-grade systems.
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Create an account to deploy isolated workspaces, access custom platform components, review production proof-of-work modules, and scale solutions.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-400 font-medium">
          © SoftRiseHub. All rights reserved.
        </div>
      </div>

      <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-4 sm:p-12 md:p-16 bg-slate-50">
        <div className="w-full max-w-md bg-[#2B3F43] rounded-2xl p-6 sm:p-10 shadow-xl border border-[#2B3F43] transition-all duration-300 my-8">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Create Account
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Initialize your environment with a developer platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">
                  First Name
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 shadow-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition duration-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 shadow-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition duration-200 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 shadow-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 pr-10 shadow-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition duration-200 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 shadow-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition duration-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-300 uppercase tracking-wider mb-1.5">
                Country
              </label>
              <input
                name="country"
                type="text"
                required
                placeholder="United States"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 shadow-sm focus:outline-none focus:border-sky-400 focus:bg-white/10 transition duration-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-white hover:bg-slate-100 disabled:bg-white/20 text-[#2B3F43] disabled:text-white/40 font-bold rounded-xl active:scale-[0.99] transition duration-150 text-sm shadow-md cursor-pointer disabled:cursor-not-allowed flex items-center justify-center pt-3"
            >
              Submit
            </button>
          </form>

          {/* Navigational Anchor Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300 flex flex-col sm:flex-row gap-2 justify-between items-center">
            <span>Already have an account?</span>
            <Link to="/login" className="text-white font-bold hover:underline tracking-tight">
              Sign in to SoftRiseHub
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Signup;