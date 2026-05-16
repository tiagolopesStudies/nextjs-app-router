import { cacheLife } from 'next/cache'
import type { IssueCard } from '@/types'
import { fetchApi } from '@/utils/api'

interface ListIssuesParams {
  search?: string
}

export interface ListIssuesResponse {
  backlog: IssueCard[]
  todo: IssueCard[]
  in_progress: IssueCard[]
  done: IssueCard[]
}

export async function listIssues({ search = '' }: ListIssuesParams) {
  'use cache'

  cacheLife('minutes')

  const data = await fetchApi<ListIssuesResponse>('/issues', {
    params: { search }
  })

  return data
}
