import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Chat = () => {
  const navigate = useNavigate()
  const [conversations, setConversations] = useState([])
  const [mode, setMode] = useState(null)
  const [guest, setGuest] = useState(null)

  useEffect(() => {
    checkUser()
  }, [])

  const fetchDetails = async () => {
    try {
      const conversationId = localStorage.getItem("conversationId")
      if (!conversationId) {
        navigate("/verify")
        return
      }
      const response = await axios.post("http://localhost:3000/api/v1/conversation/find", { conversationId }, { withCredentials: true })
      const data = response.data.conversation
      if (!data || data.status !== "Active") {
        toast.info("Old conversation is closed")
        localStorage.removeItem("conversationId")
        navigate("/verify")
        return
      }
      setGuest(data)
      setMode("Customer")

    } catch (error) {
      console.error(error)
      navigate("/verify")
    }
  }

  const checkUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/me", { withCredentials: true })
      const role = response.data.user?.role
      // if (role === "User") {
      //   setMode("Customer")
      //   return
      // }
      // else 
      if (role === "Developer" || role === "Admin") {
        setMode("Staff")
        allConversation()
        return
      }
    } catch (error) {
      fetchDetails()
    }
  }
  const allConversation = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/conversation/all", { withCredentials: true })
      setConversations(response.data.conversations);

    } catch (error) {
      console.error(error);

    }
  }

  return (
    <div className="flex w-full h-screen bg-slate-100">
      {mode === "Customer" && (
        <>
          <div className="hidden md:flex md:w-[30%] md:min-w-[260px] md:max-w-[340px] bg-white border-r border-slate-200 flex-col">
            <div className="h-16 px-4 flex items-center border-b border-slate-200">
              <h1 className="text-slate-800 text-sm font-semibold">Chats</h1>
            </div>
            <div className="p-2">
              {guest && (
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {guest.firstName[0]}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-slate-800 text-sm font-medium truncate">
                      {guest.firstName} {guest.lastName}
                    </span>
                    <span className="text-xs text-slate-500 truncate">
                      {guest.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 bg-slate-50">

            <header className="h-16 px-4 flex items-center gap-3 bg-white border-b border-slate-200">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {guest?.firstName?.[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-slate-800 text-sm font-semibold">
                  {guest?.firstName} {guest?.lastName}
                </span>
                <span className="text-xs text-slate-500">Active now</span>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-3">
              <div className="flex">
                <div className="bg-white border border-slate-200 text-slate-700 px-3 py-2 rounded-xl max-w-[85%] md:max-w-xs text-sm shadow-sm">
                  How can we help you today?
                </div>
              </div>
            </div>

            <footer className="p-3 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 bg-slate-100 text-slate-800 px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                  Send
                </button>
              </div>
            </footer>

          </div>
        </>
      )}
      {mode === "Staff" && (
        <div className="flex w-full h-screen bg-slate-100">

          {/* LEFT SIDEBAR */}
          <div className="w-[30%] bg-white border-r border-slate-200 flex flex-col">

            {/* HEADER */}
            <div className="h-16 flex items-center px-4 border-b border-slate-200">
              <h1 className="text-sm font-semibold text-slate-800">
                Conversations
              </h1>
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto p-2">

              {conversations.map((conv) => (
                <div
                  key={conv._id}
                  className="flex items-center gap-3 p-3 mb-2 rounded-xl border border-slate-100 hover:bg-slate-50 cursor-pointer transition"
                >

                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {conv.firstName?.[0] || "U"}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 overflow-hidden">

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-800 truncate">
                        {conv.firstName} {conv.lastName}
                      </span>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        {conv.status}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 truncate">
                      {conv.lastMessage || "No messages yet"}
                    </span>

                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT CHAT AREA */}
          <div className="flex-1 flex flex-col">

            {/* TOP BAR */}
            <div className="h-16 bg-white border-b border-slate-200 flex items-center px-4">
              <span className="text-sm font-semibold text-slate-800">
                Select a conversation
              </span>
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              No chat selected
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Chat