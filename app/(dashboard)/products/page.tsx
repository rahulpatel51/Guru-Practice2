"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import ProductsTab from "@/components/dashboard/tabs/products-tab"

export default function ProductsPage() {
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
        title: "Product deleted",
        description: `Product ${id} has been deleted successfully.`,
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
        title: "Products deleted",
        description: `${selectedItems.length} products have been deleted successfully.`,
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
    <ProductsTab
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

