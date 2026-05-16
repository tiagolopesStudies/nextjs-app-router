import 'server-only'

import { updateTag } from 'next/cache'
import { headers } from 'next/headers'
import type { Interaction } from '@/types'
import { fetchApi } from '@/utils/api'
import { getCookiesFromHeaders } from '@/utils/get-cookies-from-headers'

interface CreateCommentParams {
  issueId: string
  text: string
}

interface CreateCommentResponse {
  interactions: Interaction[]
}

export async function createComment({ issueId, text }: CreateCommentParams) {
  const incomingHeaders = await headers()

  const data = await fetchApi<CreateCommentResponse>(`/issues/${issueId}/comments`, {
    method: 'POST',
    body: { text },
    headers: getCookiesFromHeaders(incomingHeaders)
  })

  updateTag(`issue-comments-${issueId}`)

  return data
}
