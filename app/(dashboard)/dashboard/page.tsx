"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import DashboardContent from "@/components/dashboard/dashboard-content"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  return (
    <DashboardContent
      activeTab="dashboard"
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      searchQuery={searchQuery}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
      toast={toast}
    />
  )
}

