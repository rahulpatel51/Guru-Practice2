// User types
export interface User {
  _id?: string
  id?: string
  name: string
  email: string
  role: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

// Order types
export interface OrderItem {
  _id?: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
}

export interface Order {
  _id?: string
  id?: string
  customer: {
    name: string
    email: string
    address?: string
    phone?: string
  }
  items: OrderItem[]
  totalAmount: number
  status: string
  paymentMethod: string
  paymentStatus: string
  shippingAddress?: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  createdAt?: string
  updatedAt?: string
  // For UI compatibility
  date?: string
  total?: string
  payment?: string
  image?: string
}

// Product types
export interface Product {
  _id?: string
  id?: string
  name: string
  description?: string
  price: number
  category: string
  stock: number
  images: string[]
  status: string
  featured?: boolean
  createdAt?: string
  updatedAt?: string
  // For UI compatibility
  sales?: number
  image?: string
}

// Employee types
export interface Employee {
  _id?: string
  id?: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: string
  hireDate?: string
  salary?: number
  createdAt?: string
  updatedAt?: string
}

// Transaction types
export interface Transaction {
  _id?: string
  id?: string
  orderId?: string
  type: string
  amount: number
  status: string
  customer: string
  method: string
  date?: string
  createdAt?: string
  updatedAt?: string
}

// API response types
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Error types
export interface ApiError {
  message: string
  code?: string
  status?: number
}

