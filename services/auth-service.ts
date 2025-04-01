import { api } from "./api"
import type { User } from "@/types"

interface LoginResponse {
  user: User
  token: string
}

interface RegisterResponse {
  user: User
  token: string
}

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string, rememberMe = false): Promise<boolean> {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    })

    if (response.token && response.user) {
      // Store user in localStorage or sessionStorage based on rememberMe
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem("user", JSON.stringify(response.user))
      storage.setItem("token", response.token)
      return true
    }

    return false
  } catch (error) {
    console.error("Login error:", error)
    return false
  }
}

/**
 * Register a new user
 */
export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  try {
    const response = await api.post<RegisterResponse>("/auth/register", {
      name,
      email,
      password,
    })

    if (response.token && response.user) {
      // Don't automatically log in after registration
      return true
    }

    return false
  } catch (error) {
    console.error("Registration error:", error)
    return false
  }
}

/**
 * Get the current logged in user
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    // Check if we have a token in storage
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")

    if (!token) {
      return null
    }

    // Try to get user from API first
    try {
      const user = await api.get<User>("/auth/me")

      // Update stored user data
      const storage = localStorage.getItem("token") ? localStorage : sessionStorage
      storage.setItem("user", JSON.stringify(user))

      return user
    } catch (error) {
      // If API call fails, try to get from storage
      const userJson = localStorage.getItem("user") || sessionStorage.getItem("user")

      if (!userJson) {
        return null
      }

      return JSON.parse(userJson) as User
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  try {
    // Call logout endpoint
    await api.post<{ success: boolean }>("/auth/logout", {})

    // Clear storage regardless of API response
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
  } catch (error) {
    console.error("Sign out error:", error)

    // Clear storage even if API call fails
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
  }
}

