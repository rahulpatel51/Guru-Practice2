"use client"

import { motion } from "framer-motion"
import { ChevronDown, Edit, Filter, Loader2, Plus, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import { products } from "@/data/products-data"

interface ProductsTabProps {
  isLoading: boolean
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
  searchQuery: string
  onDelete: (id: string) => void
  onBulkDelete: () => void
  onAddItem: (type: string) => void
  onUpdateItem: (id: string, type: string) => void
  onStatusChange: (id: string, newStatus: string, type: string) => void
  toast: any
}

export default function ProductsTab({
  isLoading,
  selectedItems,
  setSelectedItems,
  searchQuery,
  onDelete,
  onBulkDelete,
  onAddItem,
  onUpdateItem,
  onStatusChange,
  toast,
}: ProductsTabProps) {
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const handleSelectAll = (items: any[]) => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Out of Stock":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Convert $ to ₹ in product prices
  const formatPrice = (price: string | number) => {
    if (typeof price === "number") {
      return `₹${price.toFixed(2)}`
    }
    return price.replace("$", "₹")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white font-poppins">Products Management</h1>
          <p className="text-muted-foreground dark:text-gray-400 font-inter">Manage your product inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700 font-medium">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 dark:border-gray-700">
              <DialogHeader>
                <DialogTitle className="dark:text-white font-poppins">Add New Product</DialogTitle>
                <DialogDescription className="dark:text-gray-400 font-inter">
                  Enter the details for the new product. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="product-name" className="dark:text-gray-300 font-medium">
                      Product Name
                    </Label>
                    <Input
                      id="product-name"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="product-category" className="dark:text-gray-300 font-medium">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="electronics" className="dark:text-gray-300">
                          Electronics
                        </SelectItem>
                        <SelectItem value="accessories" className="dark:text-gray-300">
                          Accessories
                        </SelectItem>
                        <SelectItem value="home" className="dark:text-gray-300">
                          Home
                        </SelectItem>
                        <SelectItem value="clothing" className="dark:text-gray-300">
                          Clothing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="product-price" className="dark:text-gray-300 font-medium">
                      Price
                    </Label>
                    <Input
                      id="product-price"
                      placeholder="₹0.00"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="product-description" className="dark:text-gray-300 font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="product-description"
                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="product-stock" className="dark:text-gray-300 font-medium">
                      Stock Quantity
                    </Label>
                    <Input
                      id="product-stock"
                      type="number"
                      className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="product-status" className="dark:text-gray-300 font-medium">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem value="in-stock" className="dark:text-gray-300">
                          In Stock
                        </SelectItem>
                        <SelectItem value="low-stock" className="dark:text-gray-300">
                          Low Stock
                        </SelectItem>
                        <SelectItem value="out-of-stock" className="dark:text-gray-300">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="product-image" className="dark:text-gray-300 font-medium">
                    Product Image
                  </Label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md border flex items-center justify-center dark:border-gray-700">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 font-medium">
                  Cancel
                </Button>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 font-medium"
                  onClick={() => onAddItem("Product")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {selectedItems.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2 font-medium">
                  <Trash2 className="w-4 h-4" />
                  Delete Selected
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="dark:bg-gray-800 dark:border-gray-700">
                <AlertDialogHeader>
                  <AlertDialogTitle className="dark:text-white font-poppins">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="dark:text-gray-400 font-inter">
                    This action cannot be undone. This will permanently delete the selected products from the server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 font-medium">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700 font-medium" onClick={onBulkDelete}>
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
          )}
        </div>
      </div>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg dark:text-white font-poppins">All Products</CardTitle>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  <SelectItem value="all" className="dark:text-gray-300">
                    All Categories
                  </SelectItem>
                  <SelectItem value="electronics" className="dark:text-gray-300">
                    Electronics
                  </SelectItem>
                  <SelectItem value="accessories" className="dark:text-gray-300">
                    Accessories
                  </SelectItem>
                  <SelectItem value="home" className="dark:text-gray-300">
                    Home
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="dark:border-gray-600 dark:text-gray-300">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-inter">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="py-3 px-2 text-left">
                    <Checkbox
                      checked={selectedItems.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={() => handleSelectAll(filteredProducts)}
                      className="dark:border-gray-600"
                    />
                  </th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">ID</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Product Name</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Category</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Stock</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Price</th>
                  <th className="py-3 px-2 text-left font-medium dark:text-gray-300">Status</th>
                  <th className="py-3 px-2 text-right font-medium dark:text-gray-300">Sales</th>
                  <th className="py-3 px-2 text-right font-medium dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b dark:border-gray-700">
                    <td className="py-3 px-2">
                      <Checkbox
                        checked={selectedItems.includes(product.id)}
                        onCheckedChange={() => handleSelectItem(product.id)}
                        className="dark:border-gray-600"
                      />
                    </td>
                    <td className="py-3 px-2 dark:text-gray-300">{product.id}</td>
                    <td className="py-3 px-2 dark:text-gray-300">
                      <div className="flex items-center gap-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <img
                              src={product.image || product.images?.[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 rounded-md object-cover border dark:border-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px] dark:bg-gray-800 dark:border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="dark:text-white font-poppins">Product Details</DialogTitle>
                              <DialogDescription className="dark:text-gray-400 font-inter">
                                Detailed information about {product.name}.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4 md:grid-cols-2">
                              <div className="flex flex-col items-center gap-4">
                                <img
                                  src={product.image || product.images?.[0] || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full max-w-[300px] h-[300px] rounded-md object-cover border dark:border-gray-700"
                                />
                                <div className="grid grid-cols-4 gap-2 w-full max-w-[300px]">
                                  {(product.images || [product.image]).filter(Boolean).map((img, index) => (
                                    <img
                                      key={index}
                                      src={img || "/placeholder.svg?height=60&width=60"}
                                      alt={`${product.name} thumbnail ${index + 1}`}
                                      className="w-16 h-16 rounded-md object-cover border dark:border-gray-700 cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h3 className="text-2xl font-semibold dark:text-white">{product.name}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.id}</p>
                                </div>

                                <div className="space-y-1">
                                  <p className="text-xl font-bold dark:text-white">
                                    {typeof product.price === "number"
                                      ? `₹${product.price.toFixed(2)}`
                                      : formatPrice(product.price)}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}
                                    >
                                      {product.status}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {product.stock} in stock
                                    </span>
                                  </div>
                                </div>

                                <div className="pt-2">
                                  <h4 className="text-sm font-medium dark:text-white mb-1">Description</h4>
                                  <p className="text-sm dark:text-gray-300">
                                    This premium {product.name.toLowerCase()} offers exceptional quality and
                                    performance. Perfect for everyday use with its sleek design and durable
                                    construction.
                                  </p>
                                </div>

                                <div className="space-y-2 pt-2">
                                  <h4 className="text-sm font-medium dark:text-white">Product Details</h4>
                                  <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex flex-col">
                                      <span className="text-gray-500 dark:text-gray-400">Category</span>
                                      <span className="dark:text-white">{product.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-gray-500 dark:text-gray-400">Total Sales</span>
                                      <span className="dark:text-white">{product.sales} units</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-gray-500 dark:text-gray-400">Rating</span>
                                      <span className="dark:text-white">4.5/5 (24 reviews)</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-gray-500 dark:text-gray-400">Added On</span>
                                      <span className="dark:text-white">Jan 15, 2023</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2 pt-2">
                                  <h4 className="text-sm font-medium dark:text-white">Specifications</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">Weight</span>
                                      <span className="dark:text-white">250g</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">Dimensions</span>
                                      <span className="dark:text-white">20 × 15 × 5 cm</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">Color</span>
                                      <span className="dark:text-white">Black, White, Blue</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400">Material</span>
                                      <span className="dark:text-white">Aluminum, Plastic</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2">
                              <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                                Close
                              </Button>
                              <Button className="bg-purple-600 hover:bg-purple-700">Edit Product</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 dark:text-gray-300">{product.category}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{product.stock}</td>
                    <td className="py-3 px-2 dark:text-gray-300">{formatPrice(product.price)}</td>
                    <td className="py-3 px-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 p-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="dark:bg-gray-800 dark:border-gray-700">
                          <DropdownMenuItem
                            className="dark:text-gray-300 dark:focus:bg-gray-700"
                            onClick={() => onStatusChange(product.id, "In Stock", "Product")}
                          >
                            In Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="dark:text-gray-300 dark:focus:bg-gray-700"
                            onClick={() => onStatusChange(product.id, "Low Stock", "Product")}
                          >
                            Low Stock
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="dark:text-gray-300 dark:focus:bg-gray-700"
                            onClick={() => onStatusChange(product.id, "Out of Stock", "Product")}
                          >
                            Out of Stock
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="py-3 px-2 text-right dark:text-gray-300">{product.sales}</td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 dark:border-gray-600 dark:text-gray-300"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] dark:bg-gray-800 dark:border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="dark:text-white font-poppins">
                                Edit Product {product.id}
                              </DialogTitle>
                              <DialogDescription className="dark:text-gray-400 font-inter">
                                Make changes to the product details. Click save when you're done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-20 h-20 rounded-md object-cover border dark:border-gray-700"
                                />
                                <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                                  <Upload className="w-4 h-4 mr-2" />
                                  Change Image
                                </Button>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                  <Label htmlFor="edit-product-name" className="dark:text-gray-300 font-medium">
                                    Product Name
                                  </Label>
                                  <Input
                                    id="edit-product-name"
                                    defaultValue={product.name}
                                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                  />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                  <Label htmlFor="edit-product-category" className="dark:text-gray-300 font-medium">
                                    Category
                                  </Label>
                                  <Select defaultValue={product.category.toLowerCase()}>
                                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                      <SelectItem value="electronics" className="dark:text-gray-300">
                                        Electronics
                                      </SelectItem>
                                      <SelectItem value="accessories" className="dark:text-gray-300">
                                        Accessories
                                      </SelectItem>
                                      <SelectItem value="home" className="dark:text-gray-300">
                                        Home
                                      </SelectItem>
                                      <SelectItem value="clothing" className="dark:text-gray-300">
                                        Clothing
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                  <Label htmlFor="edit-product-price" className="dark:text-gray-300 font-medium">
                                    Price
                                  </Label>
                                  <Input
                                    id="edit-product-price"
                                    defaultValue={formatPrice(product.price)}
                                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="edit-product-description" className="dark:text-gray-300 font-medium">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-product-description"
                                  className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                  <Label htmlFor="edit-product-stock" className="dark:text-gray-300 font-medium">
                                    Stock Quantity
                                  </Label>
                                  <Input
                                    id="edit-product-stock"
                                    type="number"
                                    defaultValue={product.stock}
                                    className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                  />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                  <Label htmlFor="edit-product-status" className="dark:text-gray-300 font-medium">
                                    Status
                                  </Label>
                                  <Select defaultValue={product.status.toLowerCase().replace(" ", "-")}>
                                    <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                                      <SelectItem value="in-stock" className="dark:text-gray-300">
                                        In Stock
                                      </SelectItem>
                                      <SelectItem value="low-stock" className="dark:text-gray-300">
                                        Low Stock
                                      </SelectItem>
                                      <SelectItem value="out-of-stock" className="dark:text-gray-300">
                                        Out of Stock
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 font-medium">
                                Cancel
                              </Button>
                              <Button
                                className="bg-purple-600 hover:bg-purple-700 font-medium"
                                onClick={() => onUpdateItem(product.id, "Product")}
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                  </>
                                ) : (
                                  "Save Changes"
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
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
                                This action cannot be undone. This will permanently delete the product {product.id} from
                                the server.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 font-medium">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 font-medium"
                                onClick={() => onDelete(product.id)}
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

