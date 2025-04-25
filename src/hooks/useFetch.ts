import React, { useCallback, useEffect } from "react"
import { useState } from "react"

interface RequestProps<T> {
  request: () => Promise<T>
}

interface ResponseProps<R> {
  data: R
  error?: string | unknown
  loading: boolean
}

export const useFetch = <T>({
  request,
}: RequestProps<T>): ResponseProps<T | undefined> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>()
  const [error, setError] = useState<string | unknown>()

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await request()

      setData(response)

      return response
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch()
  }, [])

  return { data, error, loading }
}
