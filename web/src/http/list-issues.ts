import type { IssuesListResponse } from '@/types'
import { fetchApi } from '@/utils/api'

export async function ListIssues() {
  const data = await fetchApi<IssuesListResponse>('/issues')

  return data
}
