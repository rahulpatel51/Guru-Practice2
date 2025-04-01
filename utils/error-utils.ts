import { toast } from "@/hooks/use-toast"

/**
 * Utility functions for handling API errors
 */

/**
 * Handle API error and show toast notification
 */
export function handleApiError(error: any, defaultMessage = "An error occurred"): void {
  console.error("API Error:", error)

  const errorMessage = error?.message || defaultMessage

  toast({
    title: "Error",
    description: errorMessage,
    variant: "destructive",
  })
}

/**
 * Format validation errors from Express backend
 */
export function formatValidationErrors(errors: Record<string, string>): string {
  if (!errors) return "Validation failed"

  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join(", ")
}

