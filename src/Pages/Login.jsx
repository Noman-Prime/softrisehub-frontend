import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LogIn, Eye, EyeOff } from "lucide-react";

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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/login`,
        formData,
        { withCredentials: true }
      );

      const user = res.data?.user;
      const role = user?.role;

      console.log("LOGIN RESPONSE:", res.data);

      if (!user) {
        toast.error("Invalid response from server");
        return;
      }

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050814] via-[#0B1220] to-[#050814] px-4">

      {/* CARD */}
      <div className="w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-900/80 to-indigo-900/80 text-center p-6">
          <LogIn className="mx-auto mb-2 text-white" />
          <h2 className="text-xl font-bold text-white">Welcome Back</h2>
          <p className="text-sm text-white/60">
            Login to SoftRiseHub
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 pr-10 focus:outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/60"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>

          {/* BUTTON */}
          <button
            onClick={submit}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-500 transition active:scale-95"
          >
            Login
          </button>

        </div>

        {/* FOOTER */}
        <div className="text-center p-4 text-sm text-white/60">
          Don’t have account?{" "}
          <Link to="/signup" className="text-blue-400 font-bold">
            Signup
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Login;