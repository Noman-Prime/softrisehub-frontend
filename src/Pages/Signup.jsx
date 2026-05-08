import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, UserPlus } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
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

      toast.success("Account created successfully!");
      navigate("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#050814] via-[#0B1220] to-[#050814] px-4">

      {/* CARD */}
      <div className="w-full max-w-md rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

        {/* HEADER */}
        <div className="text-center py-8 bg-gradient-to-r from-blue-900/80 to-indigo-900/80">
          <UserPlus className="mx-auto mb-2 text-white" size={34} />
          <h2 className="text-2xl font-bold text-white">Join SoftRiseHub</h2>
          <p className="text-white/60 text-sm">
            Create your free user account
          </p>
        </div>

        {/* FORM */}
        <div className="p-6 space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder="First Name"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />

            <input
              name="lastName"
              placeholder="Last Name"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <input
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 pr-10 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/60"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          <input
            name="country"
            placeholder="Country"
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-500 transition active:scale-95"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

        {/* FOOTER */}
        <div className="text-center pb-6 text-sm text-white/60">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-bold">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;