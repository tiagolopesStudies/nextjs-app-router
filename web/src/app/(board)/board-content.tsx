'use client'

import { useQuery } from '@tanstack/react-query'
import { ArchiveIcon, MessageCircleIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { LikeButton } from '@/components/like-button'
import { Section } from '@/components/section'
import { getIssueInteractions } from '@/http/get-issue-interactions'
import type { ListIssuesResponse } from '@/http/list-issues'

interface BoardContentProps {
  issues: ListIssuesResponse
}

export function BoardContent({ issues }: BoardContentProps) {
  const allIssuesIds = [
    ...issues.backlog.map(({ id }) => id),
    ...issues.todo.map(({ id }) => id),
    ...issues.in_progress.map(({ id }) => id),
    ...issues.done.map(({ id }) => id)
  ]

  const { data: interactionsData, isLoading: isLoadingInteractions } = useQuery({
    queryKey: ['issue-likes', allIssuesIds.sort().join(',')],
    queryFn: () => getIssueInteractions({ issueIds: allIssuesIds })
  })

  const interactions = useMemo(() => {
    if (!interactionsData) {
      return new Map<string, { isLiked: boolean; likesCount: number }>()
    }

    return new Map<string, { isLiked: boolean; likesCount: number }>(
      interactionsData.interactions.map((interaction) => [
        interaction.issueId,
        {
          isLiked: interaction.isLiked,
          likesCount: interaction.likesCount
        }
      ])
    )
  }, [interactionsData])

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>

          <Section.IssueCount>{issues.backlog.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.backlog.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">No issues matching your filters</p>
            </div>
          ) : (
            issues.backlog.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLiked={interaction?.isLiked ?? false}
                      initialLikes={interaction?.likesCount ?? 0}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            To Do
          </Section.Title>

          <Section.IssueCount>{issues.todo.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.todo.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">No issues matching your filters</p>
            </div>
          ) : (
            issues.todo.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLiked={interaction?.isLiked ?? false}
                      initialLikes={interaction?.likesCount ?? 0}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            In Progress
          </Section.Title>

          <Section.IssueCount>{issues.in_progress.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.in_progress.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">No issues matching your filters</p>
            </div>
          ) : (
            issues.in_progress.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLiked={interaction?.isLiked ?? false}
                      initialLikes={interaction?.likesCount ?? 0}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Done
          </Section.Title>

          <Section.IssueCount>{issues.done.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {issues.done.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-center">
              <p className="text-sm text-navy-300">No issues matching your filters</p>
            </div>
          ) : (
            issues.done.map((issue) => {
              const interaction = interactions.get(issue.id)

              return (
                <Card.Root href={`/issues/${issue.id}`} key={issue.id}>
                  <Card.Header>
                    <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                    <Card.Title>{issue.title}</Card.Title>
                  </Card.Header>
                  <Card.Footer>
                    <LikeButton
                      issueId={issue.id}
                      initialLiked={interaction?.isLiked ?? false}
                      initialLikes={interaction?.likesCount ?? 0}
                    />

                    <Button>
                      <MessageCircleIcon className="size-3" />
                      <span className="text-sm">{issue.comments}</span>
                    </Button>
                  </Card.Footer>
                </Card.Root>
              )
            })
          )}
        </Section.Content>
      </Section.Root>
    </main>
  )
}
