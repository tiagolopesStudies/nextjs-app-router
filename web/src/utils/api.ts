import { env } from '@/env'

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  params?: Record<string, unknown>
}

export async function fetchApi<T = unknown>(
  path: string,
  { method = 'GET', params }: FetchOptions = {}
) {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, env.NEXT_PUBLIC_API_URL)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      const stringValue = String(Array.isArray(value) ? value.join(',') : value)
      url.searchParams.set(key, stringValue)
    }
  }

  const response = await fetch(url, {
    method,
    credentials: 'include'
  })
  const data: T = await response.json()

  return data
}
