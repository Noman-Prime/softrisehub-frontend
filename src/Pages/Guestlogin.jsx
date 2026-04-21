import axios from "axios";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GuestLogin = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false); // false = show email input, true = show PIN input
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");

    const submittEmail = async () => {
        try {
            // Updated to use dynamic URL or your localhost
            const response = await axios.post("http://localhost:3000/api/v1/guest/login", 
                { email }, 
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success("Email has been sent");
                setShow(true); // Switch to PIN view
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send email");
            console.error(error);
        }
    };

    const submitWithPin = async () => {
        try {
            // Fixed typo 'awiat' to 'await'
            const response = await axios.post("http://localhost:3000/api/v1/guest/login/verifypin", 
                { email, pin }, 
                { withCredentials: true }
            );
            if(response.data.success){
                toast.success("Login Successful");
                navigate("/livechat");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid PIN");
            console.error(error);
        }
    };

    return (
        <div className="flex bg-white w-full h-screen items-center justify-center">
            <div className="flex flex-col bg-gray-100 border-2 rounded-[10px] items-center justify-center m-2 overflow-hidden shadow-lg">
                <div className="flex flex-col bg-blue-800 text-white gap-4 w-full items-center justify-center px-8 py-6">
                    <LogIn size={24} />
                    <span className="font-semibold text-center">Welcome Back To SoftRiseHub Guest Center</span>
                </div>
                
                <div className="flex flex-col bg-white w-full p-6 gap-4">
                    {!show ? (
                        /* EMAIL VIEW */
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input 
                                type="email"
                                name="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} // Added onChange
                                placeholder="example@softrisehub.com" 
                                className="border-2 rounded-[10px] p-2 outline-none focus:border-blue-500" 
                            />
                            <button 
                                onClick={submittEmail}
                                className="bg-blue-800 text-white py-2 rounded-[10px] hover:bg-blue-700 transition"
                            >
                                Send OTP
                            </button>
                        </div>
                    ) : (
                        /* PIN VIEW */
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Enter 4-Digit PIN</label>
                            <input 
                                type="text"
                                name="pin" 
                                value={pin} 
                                onChange={(e) => setPin(e.target.value)} // Added onChange
                                placeholder="XXXX" 
                                className="border-2 rounded-[10px] p-2 outline-none focus:border-blue-500 text-center tracking-widest" 
                            />
                            <button 
                                onClick={submitWithPin} // Changed to call the verification function
                                className="bg-green-700 text-white py-2 rounded-[10px] hover:bg-green-600 transition"
                            >
                                Verify & Login
                            </button>
                            <button 
                                onClick={() => setShow(false)} 
                                className="text-xs text-blue-800 underline"
                            >
                                Change Email
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GuestLogin;