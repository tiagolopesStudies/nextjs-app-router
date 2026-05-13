import type { IssueComment } from '@/types'
import { fetchApi } from '@/utils/api'

interface ListIssueCommentsParams {
  issueId: string
}

interface ListIssueCommentsResponse {
  comments: IssueComment[]
  total: number
  limit: number
  offset: number
}

export async function listIssueComments({ issueId }: ListIssueCommentsParams) {
  const data = await fetchApi<ListIssueCommentsResponse>(`/issues/${issueId}/comments`)

  return data
}
