import { api } from "./api"
import type { Order, PaginatedResponse } from "@/types"

/**
 * Get all orders with pagination
 */
export async function getOrders(page = 1, limit = 10, status = "", search = ""): Promise<PaginatedResponse<Order>> {
  try {
    let endpoint = `/orders?page=${page}&limit=${limit}`

    if (status) {
      endpoint += `&status=${encodeURIComponent(status)}`
    }

    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`
    }

    return await api.get<PaginatedResponse<Order>>(endpoint)
  } catch (error) {
    console.error("Get orders error:", error)
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  }
}

/**
 * Get order by ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    return await api.get<Order>(`/orders/${id}`)
  } catch (error) {
    console.error("Get order by ID error:", error)
    return null
  }
}

/**
 * Create a new order
 */
export async function createOrder(orderData: Omit<Order, "id">): Promise<Order | null> {
  try {
    return await api.post<Order>("/orders", orderData)
  } catch (error) {
    console.error("Create order error:", error)
    return null
  }
}

/**
 * Update an existing order
 */
export async function updateOrder(id: string, orderData: Partial<Order>): Promise<Order | null> {
  try {
    return await api.put<Order>(`/orders/${id}`, orderData)
  } catch (error) {
    console.error("Update order error:", error)
    return null
  }
}

/**
 * Delete an order
 */
export async function deleteOrder(id: string): Promise<boolean> {
  try {
    await api.delete<{ success: boolean }>(`/orders/${id}`)
    return true
  } catch (error) {
    console.error("Delete order error:", error)
    return false
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  try {
    await api.patch<Order>(`/orders/${id}/status`, { status })
    return true
  } catch (error) {
    console.error("Update order status error:", error)
    return false
  }
}

