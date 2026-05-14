import { env } from '@/env'

interface FetchOptions {
  params: Record<string, unknown>
}

export async function fetchApi<T = unknown>(path: string, options?: FetchOptions) {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, env.NEXT_PUBLIC_API_URL)

  if (options) {
    for (const [key, value] of Object.entries(options.params)) {
      const stringValue = String(Array.isArray(value) ? value.join(',') : value)
      url.searchParams.set(key, stringValue)
    }
  }

  const response = await fetch(url, {
    credentials: 'include'
  })
  const data: T = await response.json()

  return data
}
