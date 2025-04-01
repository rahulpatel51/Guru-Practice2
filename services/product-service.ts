import { api } from "./api"
import type { Product, PaginatedResponse } from "@/types"

/**
 * Get all products with pagination
 */
export async function getProducts(
  page = 1,
  limit = 10,
  search = "",
  category = "",
): Promise<PaginatedResponse<Product>> {
  try {
    let endpoint = `/products?page=${page}&limit=${limit}`

    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`
    }

    if (category) {
      endpoint += `&category=${encodeURIComponent(category)}`
    }

    return await api.get<PaginatedResponse<Product>>(endpoint)
  } catch (error) {
    console.error("Get products error:", error)
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
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await api.get<Product>(`/products/${id}`)
  } catch (error) {
    console.error("Get product by ID error:", error)
    return null
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData: Omit<Product, "id">): Promise<Product | null> {
  try {
    return await api.post<Product>("/products", productData)
  } catch (error) {
    console.error("Create product error:", error)
    return null
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  try {
    return await api.put<Product>(`/products/${id}`, productData)
  } catch (error) {
    console.error("Update product error:", error)
    return null
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await api.delete<{ success: boolean }>(`/products/${id}`)
    return true
  } catch (error) {
    console.error("Delete product error:", error)
    return false
  }
}

/**
 * Upload product image
 */
export async function uploadProductImage(id: string, file: File): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || sessionStorage.getItem("token")}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.imageUrl
  } catch (error) {
    console.error("Upload product image error:", error)
    return null
  }
}

