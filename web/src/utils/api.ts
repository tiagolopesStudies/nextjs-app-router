import { env } from '@/env'

export async function fetchApi<T = unknown>(path: string) {
  const url = `${env.NEXT_PUBLIC_API_URL}${path.startsWith('/') ? path : `/${path}`}`
  const response = await fetch(url)
  const data: T = await response.json()

  return data
}
