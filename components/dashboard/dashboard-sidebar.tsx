"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CreditCard,
  Package,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  X,
  LayoutDashboard,
  BarChart4,
  Store,
} from "lucide-react"
import Link from "next/link"
import type { User } from "@/types"

interface DashboardSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  setIsSidebarOpen: (open: boolean) => void
  onProfileClick: () => void
  user?: User | null
}

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  setIsSidebarOpen,
  onProfileClick,
  user,
}: DashboardSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "orders", label: "Orders", icon: ShoppingCart, href: "/orders" },
    { id: "products", label: "Products", icon: Package, href: "/products" },
    { id: "employees", label: "Employees", icon: Users, href: "/employees" },
    { id: "analytics", label: "Analytics", icon: BarChart4, href: "/analytics" },
    { id: "transactions", label: "Transactions", icon: CreditCard, href: "/transactions" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <motion.div
      className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform lg:relative lg:translate-x-0"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b dark:border-gray-700">
        <div className="flex items-center">
          <ShoppingBag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <span className="ml-2 text-xl font-semibold dark:text-white">ShopAdmin</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 font-normal ${
                  activeTab === item.id
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                    : "dark:text-gray-300"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start gap-3 font-normal dark:text-gray-300">
            <Store className="w-5 h-5" />
            Store Settings
          </Button>
          <div className="mt-4 flex items-center cursor-pointer" onClick={onProfileClick}>
            <Avatar className="w-8 h-8 border dark:border-gray-700">
              <AvatarImage src="/placeholder-user.jpg" alt={user?.name || "Admin"} />
              <AvatarFallback>{user?.name?.substring(0, 2).toUpperCase() || "AD"}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium dark:text-white">{user?.name || "Admin User"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || "admin@example.com"}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

