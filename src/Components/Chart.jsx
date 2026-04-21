import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EF4444"];

export default function Chart({
  stats = {},
  chartData = [],
  distributionData = [],
  dailyData = [],
}) {
  const fallbackChartData = [
    { date: "Jan", users: 50, messages: 200, projects: 10 },
    { date: "Feb", users: 80, messages: 400, projects: 20 },
    { date: "Mar", users: 120, messages: 700, projects: 35 },
    { date: "Apr", users: 160, messages: 900, projects: 50 },
  ];

  const fallbackDistribution = [
    { name: "Active", value: 70 },
    { name: "Inactive", value: 30 },
  ];

  const fallbackDaily = [
    { day: "M", messages: 40 },
    { day: "T", messages: 30 },
    { day: "W", messages: 20 },
    { day: "T2", messages: 50 },
    { day: "F", messages: 35 },
    { day: "S", messages: 10 },
    { day: "S2", messages: 5 },
  ];

  const data = chartData.length ? chartData : fallbackChartData;
  const pieData = distributionData.length
    ? distributionData
    : fallbackDistribution;
  const barData = dailyData.length ? dailyData : fallbackDaily;

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800 p-4 space-y-4">
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Users" value={stats.users || 144000} />
        <Card title="Messages" value={stats.messages || 325000} />
        <Card title="Projects" value={stats.projects || 20000} />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm border">
          <h2 className="text-sm text-gray-500 mb-4">
            Growth Overview
          </h2>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="msg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              />

              <Area
                type="monotone"
                dataKey="messages"
                stroke="#F59E0B"
                fill="url(#msg)"
              />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" />
              <Line type="monotone" dataKey="projects" stroke="#22C55E" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">
          
          {/* Donut */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <h2 className="text-sm text-gray-500 mb-2">
              User Distribution
            </h2>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <h2 className="text-sm text-gray-500 mb-2">
              Daily Messages
            </h2>

            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={barData}>
                <XAxis dataKey="day" stroke="#6B7280" />
                <Tooltip />
                <Bar
                  dataKey="messages"
                  fill="#3B82F6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Heatmap */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border">
            <h2 className="text-sm text-gray-500 mb-3">
              Activity Heatmap
            </h2>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-6 rounded ${
                    i % 5 === 0
                      ? "bg-blue-500"
                      : i % 3 === 0
                      ? "bg-blue-300"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
    </div>
  );
}