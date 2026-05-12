import { ArchiveIcon, MessageCircleIcon, ThumbsUpIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { Section } from '@/components/section'
import { ListIssues } from '@/http/list-issues'

export const metadata: Metadata = {
  title: 'Board'
}

export default async function BoardPage() {
  const data = await ListIssues()

  return (
    <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Backlog
          </Section.Title>

          <Section.IssueCount>{data.backlog.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {data.backlog.map((issue) => {
            return (
              <Card.Root href="/" key={issue.id}>
                <Card.Header>
                  <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            To Do
          </Section.Title>

          <Section.IssueCount>{data.todo.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {data.todo.map((issue) => {
            return (
              <Card.Root href="/" key={issue.id}>
                <Card.Header>
                  <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            In Progress
          </Section.Title>

          <Section.IssueCount>{data.in_progress.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {data.in_progress.map((issue) => {
            return (
              <Card.Root href="/" key={issue.id}>
                <Card.Header>
                  <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>

      <Section.Root>
        <Section.Header>
          <Section.Title>
            <ArchiveIcon className="size-3" />
            Done
          </Section.Title>

          <Section.IssueCount>{data.done.length}</Section.IssueCount>
        </Section.Header>

        <Section.Content>
          {data.done.map((issue) => {
            return (
              <Card.Root href="/" key={issue.id}>
                <Card.Header>
                  <Card.Number>ECO-{issue.issueNumber}</Card.Number>
                  <Card.Title>{issue.title}</Card.Title>
                </Card.Header>
                <Card.Footer>
                  <Button>
                    <ThumbsUpIcon className="size-3" />
                    <span className="text-sm">12</span>
                  </Button>

                  <Button>
                    <MessageCircleIcon className="size-3" />
                    <span className="text-sm">6</span>
                  </Button>
                </Card.Footer>
              </Card.Root>
            )
          })}
        </Section.Content>
      </Section.Root>
    </main>
  )
}
