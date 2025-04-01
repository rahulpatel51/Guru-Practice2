"\"use client"

import { motion } from "framer-motion"
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Import sample data
import { transactions } from "@/data/transactions-data"

interface TransactionsTabProps {
  isLoading: boolean
  searchQuery: string
  onDelete: (id: string) => void
  toast: any
}

export default function TransactionsTab({ isLoading, searchQuery, onDelete, toast }: TransactionsTabProps) {
  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white font-poppins">Transactions Management</h1>
          <p className="text-muted-foreground dark:text-gray-400 font-inter">Manage your transactions</p>
        </div>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg dark:text-white font-poppins">All Transactions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-inter">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-3 px-2 text-left">
                    <Checkbox className="dark:border-gray-600" />
                  </th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">ID</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Date</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Type</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Customer</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Method</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Status</th>
                  <th className="py-3 px-2 text-right font-medium dark:text-gray-300">Amount</th>
                  <th className="py-3 px-2 text-right font-medium dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-2">
                      <Checkbox className="dark:border-gray-600" />
                    </td>
                    <td className="py-3 px-2 dark:text-gray-300">{transaction.id}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{transaction.date}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{transaction.type}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{transaction.customer}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{transaction.method}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{transaction.status}</td>
                    <td className="py-3 px-2 text-right dark:text-gray-300">{transaction.amount}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 dark:border-gray-600 dark:text-gray-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="dark:text-white font-poppins">
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="dark:text-gray-400 font-inter">
                                This action cannot be undone. This will permanently delete the transaction{" "}
                                {transaction.id} from the server.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 font-medium">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 font-medium"
                                onClick={() => onDelete(transaction.id)}
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                  </>
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

