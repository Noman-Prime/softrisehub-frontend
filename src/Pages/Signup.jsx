import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../Components/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const payload = {
        ...formData,
        role: "User"
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/signup`,
        payload,
        { withCredentials: true }
      );

      if (data?.user) {
        setUser(data.user);
      }

      toast.success("Account created successfully!");
      navigate("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-center items-center bg-slate-50 text-slate-900 font-sans antialiased px-4 py-12 selection:bg-slate-900 selection:text-white">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center">
        
        {/* Header Block */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 block mb-3">
            SoftRiseHub
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Create account
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-normal">
            Build and deploy commercial-grade systems.
          </p>
        </div>

        {/* Form Grid Layer */}
        <form onSubmit={handleSubmit} className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.04)] space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full min-w-0">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                required
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm border border-slate-200 rounded-lg placeholder-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
              />
            </div>

            <div className="w-full min-w-0">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                required
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm border border-slate-200 rounded-lg placeholder-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm border border-slate-200 rounded-lg placeholder-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
            />
          </div>

          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm border border-slate-200 rounded-lg pr-10 placeholder-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm border border-slate-200 rounded-lg placeholder-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
            />
          </div>

          <div className="w-full">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Country
            </label>
            <input
              name="country"
              type="text"
              required
              placeholder="United States"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm border border-slate-200 rounded-lg placeholder-slate-300 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-slate-900 text-white text-sm font-bold py-3 px-4 rounded-lg hover:bg-slate-800 active:scale-[0.99] transition duration-150 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {loading ? "Creating account..." : "Continue"}
          </button>
        </form>

        {/* Bottom Link Layout */}
        <div className="w-full text-center text-sm text-slate-500 font-normal mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-900 font-bold hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;