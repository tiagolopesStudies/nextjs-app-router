import { fetchApi } from '@/utils/api'

interface ToggleIssueLikeParams {
  issueId: string
}

export interface ToggleIssueLikeResponse {
  id: string
  likes: number
  liked: boolean
}

export async function toggleIssueLike({ issueId }: ToggleIssueLikeParams) {
  const data = await fetchApi<ToggleIssueLikeResponse>(`/issues/${issueId}/like`, {
    method: 'POST'
  })

  return data
}
