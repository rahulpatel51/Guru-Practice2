"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import EmployeesTab from "@/components/dashboard/tabs/employees-tab"

export default function EmployeesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Common handlers for all tabs
  const handleDelete = (id: string) => {
    // Simulate delete operation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Employee deleted",
        description: `Employee ${id} has been deleted successfully.`,
      })
    }, 800)
  }

  const handleBulkDelete = () => {
    // Simulate bulk delete operation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSelectedItems([])
      toast({
        title: "Employees deleted",
        description: `${selectedItems.length} employees have been deleted successfully.`,
      })
    }, 1000)
  }

  const handleAddItem = (type: string) => {
    // Simulate add operation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: `${type} added`,
        description: `New ${type.toLowerCase()} has been added successfully.`,
      })
    }, 1000)
  }

  const handleUpdateItem = (id: string, type: string) => {
    // Simulate update operation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: `${type} updated`,
        description: `${type} ${id} has been updated successfully.`,
      })
    }, 800)
  }

  const handleStatusChange = (id: string, newStatus: string, type: string) => {
    // Simulate status change operation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Status updated",
        description: `${type} ${id} status changed to ${newStatus}.`,
      })
    }, 600)
  }

  return (
    <EmployeesTab
      isLoading={isLoading}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      searchQuery={searchQuery}
      onDelete={handleDelete}
      onBulkDelete={handleBulkDelete}
      onAddItem={handleAddItem}
      onUpdateItem={handleUpdateItem}
      onStatusChange={handleStatusChange}
      toast={toast}
    />
  )
}

