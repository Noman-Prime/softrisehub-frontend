import { useState } from "react"
import { User, Mail, Phone, Lock, UserCheck } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const ConversationVerify = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pin: ""
  })

  const [pin, setPin] = useState("")
  const [token, setToken] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const submittData = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/conversation/start", formData, { withCredentials: true })
      setToken(response.data.tempToken)
      console.log(response.data.tempToken);

      if (response.data && response.data.success) {
        toast.success("XXXX Pin sent to your email")
        setShow(true)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const submittPin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/conversation/verifypin", { "tempToken": token, "pin": pin }, { withCredentials: true })
      localStorage.setItem("conversationId", response.data.conversation?._id)
      if (response.data && response.data.success) {
        toast.success("Chat is being Monitered By Administater")
        navigate("/livechat")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-slate-200 flex items-center justify-center p-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col w-full max-w-md">
          <div className="bg-blue-600 p-8 text-center">
            <h2 className="text-white text-2xl font-bold">Welcome to SoftRiseHub.</h2>
            <p className="text-blue-100 text-sm mt-1">Enter your details to discuss with Developer</p>
          </div>
          <div className="p-8 flex flex-col gap-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input disabled={show} required name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="John" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Last Name</label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input disabled={show} required name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Doe" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input disabled={show} required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="tel" placeholder="03001234567" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input disabled={show} required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
              </div>
            </div>
            {show && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Verification Pin</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input required name="pin" value={pin} onChange={(e) => setPin(e.target.value)} type="number" placeholder="XXXX" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm" />
                </div>
              </div>
            )}
            {show ? (
              <>
                <button type="button" onClick={submittPin} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all mt-2 active:scale-[0.98]">
                  VerifyPin
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={submittData} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all mt-2 active:scale-[0.98]">
                  Submit Datails
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default ConversationVerify