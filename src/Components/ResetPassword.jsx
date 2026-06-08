import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const Submit = async (e) => {
        e.preventDefault(); 
        
        try {
            const result = await axios.post( `${import.meta.env.VITE_API_URL}/api/v1/user/password/reset/request`, { email }, { withCredentials: true });
            console.log(result.data.message);
            
            if (result.data) {
                navigate("/")
                toast.success("Password Reset Link has been sent to your email!");
            }
        } catch (error) {
            console.log("No account is found")
            toast.error("No account is found")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-[#2B3F43] p-8 rounded-[20px] border border-white w-full max-w-md flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white text-center">
                    Enter your Registered Email
                </h3>
                <input 
                    className="w-full p-3 border border-white rounded-[15px] focus:outline-none bg-white text-black font-semibold"
                    placeholder="sample@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                <button onClick={Submit} className="w-full bg-white text-[#2B3F43] py-3 rounded-[15px] font-bold hover:bg-green-500 hover:text-white transition duration-200"> 
                    Submit 
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;