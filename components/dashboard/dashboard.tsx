"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardContent from "@/components/dashboard/dashboard-content"
import { AnimatePresence } from "framer-motion"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()
  const { toast } = useToast()

  const handleProfileClick = () => {
    router.push("/profile")
  }

  const handleNotificationsClick = () => {
    router.push("/notifications")
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <DashboardSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsSidebarOpen={setIsSidebarOpen}
            onProfileClick={handleProfileClick}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onProfileClick={handleProfileClick}
          onNotificationsClick={handleNotificationsClick}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
          <DashboardContent
            activeTab={activeTab}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            toast={toast}
          />
        </main>
      </div>
      <Toaster />
    </div>
  )
}

