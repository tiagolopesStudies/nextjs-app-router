import type { IssueDetails } from '@/types'
import { fetchApi } from '@/utils/api'

interface GetIssueParams {
  id: string
}

export async function getIssue({ id }: GetIssueParams) {
  'use cache'

  const data = await fetchApi<IssueDetails>(`/issues/${id}`)

  return data
}
