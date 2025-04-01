"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import TransactionsTab from "@/components/dashboard/tabs/transactions-tab"

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Common handlers for all tabs
  const handleDelete = (id: string) => {
    // Simulate delete operation
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Transaction deleted",
        description: `Transaction ${id} has been deleted successfully.`,
      })
    }, 800)
  }

  return <TransactionsTab isLoading={isLoading} searchQuery={searchQuery} onDelete={handleDelete} toast={toast} />
}

