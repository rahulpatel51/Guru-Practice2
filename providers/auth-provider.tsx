"use client"

import type React from "react"

import { createContext, useEffect, useState, useCallback, useMemo } from "react"
import type { User } from "@/types"
import { getCurrentUser } from "@/services/auth-service"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [tokenRefreshInterval, setTokenRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  // Function to refresh the token
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        if (data.token) {
          // Update token in storage
          const storage = localStorage.getItem("token") ? localStorage : sessionStorage
          storage.setItem("token", data.token)
        }
      }
    } catch (error) {
      console.error("Token refresh error:", error)
    }
  }, [])

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)

        // Set up token refresh interval if user is authenticated
        if (userData && !tokenRefreshInterval) {
          // Refresh token every 29 minutes (assuming 30 min expiry)
          const interval = setInterval(refreshToken, 29 * 60 * 1000)
          setTokenRefreshInterval(interval)
        }
      } catch (error) {
        console.error("Auth provider error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()

    // Cleanup interval on unmount
    return () => {
      if (tokenRefreshInterval) {
        clearInterval(tokenRefreshInterval)
      }
    }
  }, [tokenRefreshInterval, refreshToken])

  // Value to provide to consumers
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      setUser,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

