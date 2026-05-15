import { env } from '@/env'

interface FetchOptions extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  params?: Record<string, unknown>
  body?: Record<string, unknown>
}

export async function fetchApi<T = unknown>(
  path: string,
  { method = 'GET', params, body, ...options }: FetchOptions = {}
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
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    ...options
  })
  const data: T = await response.json()

  return data
}
