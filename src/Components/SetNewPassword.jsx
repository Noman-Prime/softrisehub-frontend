import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const SetNewPassword = () => {
    const navigate = useNavigate()
    const { token } = useParams();
    console.log("Current Token", token);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/password/reset/${token}`, formData, { withCredentials: true });
            console.log(result.data);
            if (result.data) {
                toast.success("Password updated successfully!");
            }
        } catch (error) {
            toast.error(error.response.data?.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-[#2B3F43] p-8 rounded-[20px] border border-white shadow-xl w-full max-w-md flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white text-center mb-2">Create New Password</h3>
                <div className="flex flex-col gap-1">
                    <label className="text-white font-semibold">Enter New Password</label>
                    <div className="relative w-full">
                        <input className="w-full p-3 border border-white rounded-[15px] focus:outline-none bg-white text-black font-semibold pr-10"
                            placeholder="........" name="newPassword" type={showPassword ? "text" : "password"} value={formData.newPassword} onChange={handleChange} />
                        <button type="button" className="absolute right-3 top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)} >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-white font-semibold">Confirm New Password</label>
                    <div className="relative w-full">
                        <input className="w-full p-3 border border-white rounded-[15px] focus:outline-none bg-white text-black font-semibold pr-10" placeholder="........" name="confirmNewPassword" type={showPassword ? "text" : "password"} value={formData.confirmNewPassword} onChange={handleChange} />
                        <button type="button" className="absolute right-3 top-3 text-gray-500" onClick={() => setShowPassword(!showPassword)} >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <button onClick={Submit} className="w-full mt-2 bg-white text-[#2B3F43] py-3 rounded-[15px] font-bold hover:bg-green-500 hover:text-white transition duration-200" >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default SetNewPassword;