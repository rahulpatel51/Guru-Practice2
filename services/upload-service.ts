/**
 * Service for handling file uploads
 */

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

/**
 * Upload a file to the server
 */
export async function uploadFile(file: File, type: "product" | "user" | "order" = "product"): Promise<string | null> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    // Get auth token
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")

    if (!token) {
      throw new Error("Authentication required")
    }

    const response = await fetch(`${API_BASE_URL}/upload/${type}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Upload failed with status: ${response.status}`)
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error("File upload error:", error)
    return null
  }
}

/**
 * Upload multiple files to the server
 */
export async function uploadMultipleFiles(
  files: File[],
  type: "product" | "user" | "order" = "product",
): Promise<string[]> {
  try {
    const uploadPromises = Array.from(files).map((file) => uploadFile(file, type))
    const results = await Promise.all(uploadPromises)
    return results.filter((url): url is string => url !== null)
  } catch (error) {
    console.error("Multiple file upload error:", error)
    return []
  }
}

