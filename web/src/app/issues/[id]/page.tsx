import { ArchiveIcon, MoveLeftIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Suspense } from 'react'
import { createComment } from '@/http/create-comment'
import { getIssue } from '@/http/get-issue'
import { authClient } from '@/lib/auth-client'
import { IssueCommentForm } from './issue-comment-form'
import { IssueCommentsList } from './issue-comments/issue-comments-list'
import { IssueCommentsLoading } from './issue-comments/issue-comments-loading'
import { IssueLikeButton } from './issue-like-button'

interface IssueDetailsPageProps {
  params: Promise<{ id: string }>
}

export const generateMetadata = async ({
  params
}: IssueDetailsPageProps): Promise<Metadata> => {
  const { id } = await params
  const issue = await getIssue({ id })

  return {
    title: issue.title
  }
}

const statusLabel = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done'
} as const

export default async function IssueDetailsPage({ params }: IssueDetailsPageProps) {
  const { id } = await params
  const issue = await getIssue({ id })

  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  })
  const isAuthenticated = !!session?.user

  async function onCreateComment(text: string) {
    'use server'

    await createComment({ issueId: id, text })
  }

  return (
    <main className="max-w-225 mx-auto w-full flex flex-col gap-4 p-6 bg-navy-800 border-[0.5px] border-navy-500 rounded-xl">
      <Link
        href="/"
        className="flex items-center gap-2 text-navy-200 hover:text-navy-100"
      >
        <MoveLeftIcon className="size-4" />
        <span className="text-xs">Back to board</span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs">
          <ArchiveIcon className="size-3" />
          {statusLabel[issue.status] ?? statusLabel.backlog}
        </span>

        <IssueLikeButton issueId={issue.id} />
      </div>

      <div className="space-y-2">
        <h1 className="font-semibold text-2xl">{issue.title}</h1>
        <p className="text-navy-100 text-sm leading-relaxed">{issue.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-semibold">Comments</span>

        <IssueCommentForm
          onCreateComment={onCreateComment}
          isAuthenticated={isAuthenticated}
        />

        <div className="mt-3">
          <Suspense fallback={<IssueCommentsLoading />}>
            <IssueCommentsList issueId={id} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
