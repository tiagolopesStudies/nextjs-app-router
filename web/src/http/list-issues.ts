import type { IssueCard } from '@/types'
import { fetchApi } from '@/utils/api'

interface ListIssuesParams {
  search?: string
}

interface ListIssuesResponse {
  backlog: IssueCard[]
  todo: IssueCard[]
  in_progress: IssueCard[]
  done: IssueCard[]
}

export async function listIssues({ search = '' }: ListIssuesParams) {
  const data = await fetchApi<ListIssuesResponse>('/issues', {
    params: { search }
  })

  return data
}
