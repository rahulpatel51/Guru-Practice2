"use client"

import { useState, useEffect, useCallback } from "react"
import type { PaginatedResponse } from "@/types"
import { handleApiError } from "@/utils/error-utils"

interface UsePaginatedDataOptions<T> {
  fetchFunction: (page: number, limit: number, ...args: any[]) => Promise<PaginatedResponse<T>>
  initialPage?: number
  initialLimit?: number
  dependencies?: any[]
  additionalArgs?: any[]
}

export function usePaginatedData<T>({
  fetchFunction,
  initialPage = 1,
  initialLimit = 10,
  dependencies = [],
  additionalArgs = [],
}: UsePaginatedDataOptions<T>) {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetchFunction(page, limit, ...additionalArgs)

      setData(response.data)
      setTotal(response.total)
      setTotalPages(response.totalPages)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred while fetching data")
      setError(error)
      handleApiError(error)
    } finally {
      setIsLoading(false)
    }
  }, [page, limit, fetchFunction, ...additionalArgs, ...dependencies])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const goToPage = useCallback(
    (newPage: number) => {
      setPage(Math.max(1, Math.min(newPage, totalPages)))
    },
    [totalPages],
  )

  const nextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }, [page, totalPages])

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit)
    setPage(1) // Reset to first page when changing limit
  }, [])

  const refresh = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    error,
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    refresh,
  }
}

