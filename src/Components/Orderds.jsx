import React from 'react';
// Ensure you have run: npm install lucide-react
import { Calendar, User, Package, ChevronRight } from 'lucide-react';

const Orders = () => {
  const orderData = [
    { id: "ORD-101", customer: "John Doe", item: "Web Design Project", status: "In Progress", date: "2026-04-05", priority: "High" },
    { id: "ORD-102", customer: "Jane Smith", item: "Logo Branding", status: "Completed", date: "2026-04-03", priority: "Medium" },
    { id: "ORD-103", customer: "Mike Ross", item: "Backend Integration", status: "Pending", date: "2026-04-06", priority: "Low" }
  ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-orange-400';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
        <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">View All</span>
      </div>

      {orderData.map((order) => (
        <div 
          key={order.id} 
          className="group relative flex flex-col md:flex-row justify-between items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
          {/* Priority Accent Bar */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${getPriorityStyle(order.priority)}`} />

          {/* Left Section */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="hidden sm:flex p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-black group-hover:bg-gray-100 transition-colors">
              <Package size={24} />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{order.id}</span>
                {/* FIXED: Changed <span> to <div> or matched the closing tag */}
                <div className={`text-[10px] px-2 py-0.5 rounded-full text-white ${getPriorityStyle(order.priority)}`}>
                  {order.priority}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight mt-1">{order.item}</h3>
              
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <User size={14} />
                  <span>{order.customer}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Calendar size={14} />
                  <span>{order.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-5 md:mt-0 flex items-center justify-between w-full md:w-auto md:gap-6 border-t md:border-t-0 pt-4 md:pt-0">
            <div className="flex flex-col items-end">
              <span className={`text-xs font-bold uppercase mb-1 ${
                order.status === 'Completed' ? 'text-green-600' : 
                order.status === 'In Progress' ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {order.status}
              </span>
              <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-500 ${
                  order.status === 'Completed' ? 'w-full bg-green-500' : 
                  order.status === 'In Progress' ? 'w-1/2 bg-blue-500' : 'w-1/4 bg-orange-500'
                }`} />
              </div>
            </div>

            <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gray-200">
              Details
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;