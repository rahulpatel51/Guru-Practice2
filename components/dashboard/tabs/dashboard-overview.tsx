"use client"

import { CardFooter } from "@/components/ui/card"

import { motion } from "framer-motion"
import { Box, DollarSign, RefreshCw, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function DashboardOverview() {
  // Sample data for charts
  const revenueData = [
    { name: "Jan", revenue: 4000, profit: 2400 },
    { name: "Feb", revenue: 3000, profit: 1398 },
    { name: "Mar", revenue: 5000, profit: 3000 },
    { name: "Apr", revenue: 4500, profit: 2780 },
    { name: "May", revenue: 6000, profit: 3890 },
    { name: "Jun", revenue: 5500, profit: 3300 },
    { name: "Jul", revenue: 7000, profit: 4300 },
  ]

  const salesData = [
    { name: "Mon", sales: 120 },
    { name: "Tue", sales: 200 },
    { name: "Wed", sales: 150 },
    { name: "Thu", sales: 180 },
    { name: "Fri", sales: 250 },
    { name: "Sat", sales: 300 },
    { name: "Sun", sales: 200 },
  ]

  const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Home", value: 200 },
    { name: "Beauty", value: 150 },
    { name: "Sports", value: 100 },
  ]

  const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#8b5cf6"]

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", date: "2023-05-15", status: "Completed", total: "$120.00" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2023-05-14", status: "Processing", total: "$85.50" },
    { id: "#ORD-003", customer: "Robert Johnson", date: "2023-05-14", status: "Shipped", total: "$220.75" },
    { id: "#ORD-004", customer: "Emily Davis", date: "2023-05-13", status: "Pending", total: "$65.25" },
    { id: "#ORD-005", customer: "Michael Brown", date: "2023-05-12", status: "Completed", total: "$175.00" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white font-poppins">Dashboard Overview</h1>
        <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
          <RefreshCw className="w-4 h-4" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-l-4 border-purple-500 dark:bg-gray-800 dark:border-purple-400 dark:border-l-4 dark:border-t dark:border-r dark:border-b">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold dark:text-white">$24,780</h3>
                  <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                  <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-l-4 border-cyan-500 dark:bg-gray-800 dark:border-cyan-400 dark:border-l-4 dark:border-t dark:border-r dark:border-b">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Total Orders</p>
                  <h3 className="text-2xl font-bold dark:text-white">1,245</h3>
                  <p className="text-xs text-green-500 mt-1">+8.2% from last month</p>
                </div>
                <div className="p-3 bg-cyan-100 rounded-full dark:bg-cyan-900">
                  <ShoppingCart className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-l-4 border-emerald-500 dark:bg-gray-800 dark:border-emerald-400 dark:border-l-4 dark:border-t dark:border-r dark:border-b">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Total Products</p>
                  <h3 className="text-2xl font-bold dark:text-white">450</h3>
                  <p className="text-xs text-green-500 mt-1">+5.3% from last month</p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full dark:bg-emerald-900">
                  <Box className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="border-l-4 border-purple-500 dark:bg-gray-800 dark:border-purple-400 dark:border-l-4 dark:border-t dark:border-r dark:border-b">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">Total Customers</p>
                  <h3 className="text-2xl font-bold dark:text-white">2,456</h3>
                  <p className="text-xs text-green-500 mt-1">+15.7% from last month</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Revenue Overview</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">
              Monthly revenue for the current year
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
                  <YAxis stroke="#888888" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <Tooltip />
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
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Sales Statistics</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">
              Daily sales for the current week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Distribution and Recent Orders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Category Distribution</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white font-poppins">Recent Orders</CardTitle>
            <CardDescription className="dark:text-gray-400 font-inter">Latest 5 orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Order ID</th>
                    <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Customer</th>
                    <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Date</th>
                    <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Status</th>
                    <th className="py-3 px-2 text-right font-medium dark:text-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b dark:border-gray-700">
                      <td className="py-3 px-2 dark:text-gray-300">{order.id}</td>
                      <td className="py-3 px-2 dark:text-gray-300">{order.customer}</td>
                      <td className="py-3 px-2 dark:text-gray-300">{order.date}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right dark:text-gray-300">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" size="sm" className="dark:border-gray-600 dark:text-gray-300">
              View All Orders
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  )
}

