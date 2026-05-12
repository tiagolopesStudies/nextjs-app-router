import { env } from '@/env'

interface FetchOptions {
  params: Record<string, unknown>
}

export async function fetchApi<T = unknown>(path: string, options?: FetchOptions) {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, env.NEXT_PUBLIC_API_URL)

  if (options) {
    for (const [key, value] of Object.entries(options.params)) {
      url.searchParams.set(key, String(value))
    }
  }

  const response = await fetch(url)
  const data: T = await response.json()

  return data
}
