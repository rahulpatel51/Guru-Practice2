"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

type AnalyticsTabProps = {}

export default function AnalyticsTab() {
  // Sample data for charts
  const revenueData = [
    { name: "Jan", revenue: 400000, profit: 240000 },
    { name: "Feb", revenue: 300000, profit: 139800 },
    { name: "Mar", revenue: 500000, profit: 300000 },
    { name: "Apr", revenue: 450000, profit: 278000 },
    { name: "May", revenue: 600000, profit: 389000 },
    { name: "Jun", revenue: 550000, profit: 330000 },
    { name: "Jul", revenue: 700000, profit: 430000 },
  ]

  const trafficSourcesData = [
    { name: "Direct", value: 30 },
    { name: "Organic Search", value: 25 },
    { name: "Social Media", value: 20 },
    { name: "Referral", value: 15 },
    { name: "Email", value: 10 },
  ]

  const deviceUsageData = [
    { name: "Mobile", value: 55 },
    { name: "Desktop", value: 35 },
    { name: "Tablet", value: 10 },
  ]

  const customerSegmentsData = [
    { name: "New Customers", value: 40 },
    { name: "Returning", value: 35 },
    { name: "Loyal", value: 25 },
  ]

  const hourlyTrafficData = [
    { hour: "00:00", visitors: 20 },
    { hour: "02:00", visitors: 12 },
    { hour: "04:00", visitors: 8 },
    { hour: "06:00", visitors: 15 },
    { hour: "08:00", visitors: 45 },
    { hour: "10:00", visitors: 68 },
    { hour: "12:00", visitors: 80 },
    { hour: "14:00", visitors: 75 },
    { hour: "16:00", visitors: 65 },
    { hour: "18:00", visitors: 55 },
    { hour: "20:00", visitors: 40 },
    { hour: "22:00", visitors: 30 },
  ]

  const salesByProductData = [
    { name: "Wireless Headphones", sales: 120 },
    { name: "Smart Watch", sales: 98 },
    { name: "Bluetooth Speaker", sales: 87 },
    { name: "Laptop Backpack", sales: 76 },
    { name: "Phone Case", sales: 65 },
  ]

  const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ec4899"]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold dark:text-white font-poppins">Analytics Dashboard</h1>
        <p className="text-muted-foreground dark:text-gray-400 font-inter">
          Comprehensive overview of your business performance
        </p>
      </div>

      {/* Revenue Overview */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white font-poppins">Revenue Overview</CardTitle>
          <CardDescription className="dark:text-gray-400 font-inter">
            Monthly revenue and profit for the current year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" tickFormatter={(value) => `₹${value / 1000}K`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, undefined]} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources and Device Usage */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Traffic Sources</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Device Usage</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">
              What devices your customers are using
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Traffic and Sales by Product */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Hourly Traffic</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">
              Visitor count throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Top Selling Products</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">Products with the highest sales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByProductData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#888888" />
                  <YAxis dataKey="name" type="category" stroke="#888888" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white font-poppins">Customer Segments</CardTitle>
          <CardDescription className="dark:text-gray-400 font-inter">Breakdown of your customer base</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegmentsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {customerSegmentsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

