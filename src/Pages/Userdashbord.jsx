import { useState } from "react"
import Orders from "../Components/Orderds"
import LiveChat from "./Livechat"
import Chart from "../Components/Chart"

const UserDashbord = () => {
    const [activeView, setActiveView] = useState("chart")

    return (
        <div className="flex justify-center w-full min-h-screen bg-gray-50">
            <div className="flex flex-row justify-start w-full mx-2 my-1 rounded-[10px] shadow bg-gray-100">
                <div className="flex flex-col justify-between m-2 w-[100px] p-2 h-[97vh] shadow bg-white border-2 rounded-[10px] items-center">
                    <div className="flex flex-col gap-6 items-center w-full mt-2">
                        <div className="w-[50px] h-[50px] rounded-full overflow-hidden shadow-sm border border-gray-100" onClick={()=>setActiveView("chart")}>
                            <img
                                src="/logo.png"
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div
                                className={`text-center py-2 w-[80px] rounded-[20px] shadow-sm hover:cursor-pointer transition-all duration-200 flex items-center justify-center ${
                                    activeView === "messages" ? 'bg-blue-600 text-white scale-105' : 'bg-black text-white hover:bg-gray-800'
                                }`}
                                onClick={() => setActiveView("messages")}
                            >
                                <span className="text-[12px] font-medium">Message</span>
                            </div>

                            <div
                                className={`text-center py-2 w-[80px] rounded-[20px] shadow-sm hover:cursor-pointer transition-all duration-200 flex items-center justify-center ${
                                    activeView === "Orders" ? 'bg-blue-600 text-white scale-105' : 'bg-black text-white hover:bg-gray-800'
                                }`}
                                onClick={() => setActiveView("Orders")}
                            >
                                <span className="text-[12px] font-medium">Orders</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-white m-2 border-2 rounded-[10px] p-6 overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        {activeView === "chart" && <Chart />}
                        {activeView === "Orders" && <Orders />}
                        {activeView === "messages" && <LiveChat />}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserDashbord