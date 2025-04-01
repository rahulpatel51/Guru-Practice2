/**
 * Base API service for making HTTP requests to Express backend
 */

// Base URL for API requests - using the environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Default headers for API requests
const defaultHeaders = {
  "Content-Type": "application/json",
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem("token") || sessionStorage.getItem("token")
}

// Helper function to add auth token to headers
const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken()

  if (!token) {
    return defaultHeaders
  }

  return {
    ...defaultHeaders,
    Authorization: `Bearer ${token}`,
  }
}

// Generic request function
async function request<T>(endpoint: string, method = "GET", data?: any, customHeaders?: HeadersInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const headers = {
    ...getAuthHeaders(),
    ...customHeaders,
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: "include",
  }

  if (data) {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      // Handle different error status codes
      if (response.status === 401) {
        // Clear auth data and redirect to login
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        localStorage.removeItem("user")
        sessionStorage.removeItem("user")

        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
      }

      // Try to parse error response
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: "An unknown error occurred" }
      }

      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

// API service with convenience methods
export const api = {
  get: <T>(endpoint: string, customHeaders?: HeadersInit) => 
    request<T>(endpoint, "GET", undefined, customHeaders),
  
  post: <T>(endpoint: string, data: any, customHeaders?: HeadersInit) => 
    request<T>(endpoint, "POST", data, customHeaders),
  
  put: <T>(endpoint: string, data: any, customHeaders?: HeadersInit) => 
    request<T>(endpoint, "PUT", data, customHeaders),
  
  patch: <T>(endpoint: string, data: any, customHeaders?: HeadersInit) => 
    request<T>(endpoint, "PATCH", data, customHeaders),
  
  delete: <T>(endpoint: string, customHeaders?: HeadersInit) => 
    request<T>(endpoint, "DELETE", undefined, customHeaders),
};

