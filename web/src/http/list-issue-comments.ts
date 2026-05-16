import { cacheLife, cacheTag } from 'next/cache'
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
  'use cache'

  cacheLife('minutes')
  cacheTag(`issue-comments-${issueId}`)

  const data = await fetchApi<ListIssueCommentsResponse>(`/issues/${issueId}/comments`)

  return data
}
