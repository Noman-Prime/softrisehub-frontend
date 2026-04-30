import { MoreVertical, MessageSquare, LogIn, UserPlus, Home, Package, Settings, LogOut, CircleUser } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import axios from "axios"

const Navbar = () => {
  const [user, setUser] = useState(null)
  const profileRef = useRef(null)
  const mobileRef = useRef(null)

  const [open, setOpen] = useState({
    profile: false,
    mobile: false,
  })

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/user/me`, { withCredentials: true })
        setUser(response.data.user)
      }
      catch (error) {
        console.error(error)
      }
    }
    checkLogin()

    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpen((pre => ({
          ...pre,
          profile: false
        })
        ))
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setOpen((pre => ({
          ...pre,
          mobile: false
        })
        ))
      }
    }
    document.addEventListener("mousedown", handleClick)
    return (() => { document.removeEventListener("mousedown", handleClick) })
  }, [])
  const toggleProfile = () => {
    setOpen((pre => ({
      ...pre,
      profile: !pre.profile
    })
    ))
  }
  const toggleMobile = () => {
    setOpen((pre => ({
      ...pre,
      mobile: !pre.mobile
    })
    ))
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    }),
      setOpen({ profile: false, mobile: false, isLogin: false })
  }
  const logout = async () => {
    try {
      const responce = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`, {}, { withCredentials: true })
      if (responce) {
        setUser(null)
        toast.success("Logout Successful")
        scrollToTop()
      }
    } catch (error) {
      toast.error(error)
    }
  }
  return (
    <>
      <div className="flex justify-center w-full items-center sticky top-0 z-[100]">
        <div className="flex flex-row shadow-lg shadow-black w-full justify-between items-center px-2 py-1.5 bg-white">

          <div className="sm:flex flex-row bg-white items-center justify-start gap-1 shadow rounded-[50px] px-2 py-1.5 hover:cursor-pointer hover:border-black">
            <img src="logo.png" alt="Logo" className="hidden md:block w-10 h-auto" />
            <span className="text-blue-600 font-bold py-1 sm:flex text-blue-600 font-bold pr-2">SoftRiseHub</span>
          </div>

          <div className="hidden sm:flex flex-row rounded-[10px] shadow items-center justify-center gap-10 px-6 py-1.5">
            <div className="flex border rounded-[50px] shadow text-center bg-white px-2 py-0.5 hover:cursor-pointer hover:bg-gray-300 hover:text-blue-600">
              <Link to="/" onClick={scrollToTop} >Home</Link>
            </div>
            <div className="flex border rounded-[50px] shadow text-center bg-white px-2 py-0.5 hover:cursor-pointer hover:bg-gray-300 hover:text-blue-600">
              <Link to="/products" onClick={scrollToTop} >Projects</Link>
            </div>
            <div className="flex border rounded-[50px] shadow text-center bg-white px-2 py-0.5 hover:cursor-pointer hover:bg-gray-300 hover:text-blue-600">
              <Link to="/services" onClick={scrollToTop} >Services</Link>
            </div>
          </div>

          <div className="flex flex-row rounded-[10px] shadow items-center justify-center px-2 py-1 sm: py-1.5 gap-3">
            {/* 
            <div className="border rounded-full sm:flex rounded-[50px] shadow text-center bg-white px-2 py-0.5 hover:cursor-pointer hover:bg-gray-300 hover:text-blue-600 items-center gap-1">
              {/* <Link to="/livechat" onClick={scrollToTop} className="hidden sm:block">Discuss with Developer</Link> */}
              {/* <MessageSquare size={18} color="blue" className="w-6 h-8 rounded-full object-cover sm:hidden" /> */}
            {/* </div>  */}
  

            <div className="relative" ref={profileRef}>
              <div className="flex border-2 border-blue-600 rounded-full shadow hover:cursor-pointer hover:border-black" onClick={toggleProfile}>
                <img src="/logo.png" alt="profile" className="w-8 h-8 rounded-full object-cover" />

                {open.profile && (
                  (user ? (
                    <div className="absolute right-0 mt-13 w-36 flex flex-col border border-gray-100 bg-white shadow-lg rounded-xl p-1 z-50">
                      <Link to="/me" onClick={scrollToTop} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors"> <CircleUser size={18} /> {user.firstName} </Link>
                      <button onClick={logout} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors" ><LogOut size={18} /> Logout </button>
                    </div>
                  ) : (
                    <>
                      <div className="absolute right-0 mt-13 w-28 flex flex-col border border-gray-100 bg-white shadow-lg rounded-xl p-1 z-50">
                        <Link to="/login" onClick={scrollToTop} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors"> <LogIn size={18} /> Login </Link>
                        <Link to="/signup" onClick={scrollToTop} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors" ><UserPlus size={18} /> Signup </Link>
                      </div>
                    </>
                  )
                  )
                )
                }

              </div>

            </div>
            <div className="sm:hidden relative" ref={mobileRef}>
              <span className="text-blue-600 font-bold " onClick={toggleMobile}><MoreVertical size={18} /></span>
              {open.mobile && (
                <>
                  <div className="absolute right-0 mt-6 w-28 flex flex-col border border-gray-100 bg-white shadow-lg rounded-xl p-1 z-50">
                    <Link to="/" onClick={scrollToTop} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 text-center hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors"> <Home size={18} /> Home </Link>
                    <Link to="/products" onClick={scrollToTop} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 text-center hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors border-t border-gray-50" ><Package size={18} /> Products </Link>
                    <Link to="/services" onClick={scrollToTop} className="flex w-full gap-2 py-2 px-3 text-sm font-semibold text-gray-700 text-center hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors border-t border-gray-50" ><Settings size={18} /> Services </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
export default Navbar