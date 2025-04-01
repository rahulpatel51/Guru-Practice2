import type { Order } from "@/types"

/**
 * Utility functions for handling MongoDB data conversion
 */

/**
 * Convert MongoDB _id to id for frontend compatibility
 */
export function normalizeId<T extends { _id?: string; id?: string }>(item: T): T & { id: string } {
  if (!item) return item as T & { id: string }

  return {
    ...item,
    id: item.id || item._id,
  } as T & { id: string }
}

/**
 * Convert MongoDB data array to frontend compatible format
 */
export function normalizeData<T extends { _id?: string; id?: string }>(data: T[]): (T & { id: string })[] {
  return data.map(normalizeId)
}

/**
 * Format price for display
 */
export function formatPrice(price: number | string): string {
  if (typeof price === "number") {
    return `₹${price.toFixed(2)}`
  }

  if (typeof price === "string") {
    // Handle string prices (like "$10.99")
    return price.replace(/\$/, "₹")
  }

  return "₹0.00"
}

/**
 * Format date for display
 */
export function formatDate(date: string | Date): string {
  if (!date) return ""

  const dateObj = typeof date === "string" ? new Date(date) : date
  return dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Get customer name from order
 */
export function getCustomerName(order: Order): string {
  if (typeof order.customer === "object") {
    return order.customer.name
  }
  return order.customer
}

/**
 * Get order total
 */
export function getOrderTotal(order: Order): string {
  if (order.total) {
    return order.total
  }

  if (typeof order.totalAmount === "number") {
    return formatPrice(order.totalAmount)
  }

  return formatPrice(0)
}

