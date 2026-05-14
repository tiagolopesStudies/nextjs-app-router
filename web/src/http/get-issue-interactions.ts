import type { Interaction } from '@/types'
import { fetchApi } from '@/utils/api'

interface GetIssueInteractionsParams {
  issueIds: string[]
}

interface GetIssueInteractionsResponse {
  interactions: Interaction[]
}

export async function getIssueInteractions({ issueIds }: GetIssueInteractionsParams) {
  const data = await fetchApi<GetIssueInteractionsResponse>('/issues/interactions', {
    params: {
      issueIds
    }
  })

  return data
}
