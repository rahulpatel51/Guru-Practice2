"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardFooter from "@/components/dashboard/dashboard-footer"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { user, isLoading: authLoading, isAuthenticated } = useAuth()

  // Set active tab based on pathname
  useEffect(() => {
    if (pathname === "/dashboard") {
      setActiveTab("dashboard")
    } else if (pathname.includes("/orders")) {
      setActiveTab("orders")
    } else if (pathname.includes("/products")) {
      setActiveTab("products")
    } else if (pathname.includes("/employees")) {
      setActiveTab("employees")
    } else if (pathname.includes("/analytics")) {
      setActiveTab("analytics")
    } else if (pathname.includes("/transactions")) {
      setActiveTab("transactions")
    } else if (pathname.includes("/settings")) {
      setActiveTab("settings")
    }
  }, [pathname])

  // Check if user is authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [authLoading, isAuthenticated, router])

  // Set active tab based on pathname
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // You can add initial data fetching here if needed
        // For example, fetching user preferences, notifications, etc.
      } catch (error) {
        console.error("Error fetching initial data:", error)
      }
    }

    if (isAuthenticated) {
      fetchInitialData()
    }
  }, [isAuthenticated])

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const handleNotificationsClick = () => {
    router.push("/notifications")
  }

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-t-purple-600 dark:border-t-purple-400 animate-spin"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">Loading Dashboard</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please wait while we prepare your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <DashboardSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setIsSidebarOpen={setIsSidebarOpen}
              onProfileClick={handleProfileClick}
              user={user}
            />
          )}
        </AnimatePresence>

        {/* Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onProfileClick={handleProfileClick}
            onNotificationsClick={handleNotificationsClick}
            user={user}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">{children}</main>

          {/* Footer */}
          <DashboardFooter />
        </div>
      </div>
      <Toaster />
    </div>
  )
}

