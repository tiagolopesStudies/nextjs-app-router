import { ArchiveIcon } from 'lucide-react'
import { Section } from '@/components/section'

export default function Home() {
  return (
    <div className="max-w-405 w-full mx-auto p-10 flex flex-col gap-8 h-dvh">
      <div />

      <main className="grid grid-cols-4 gap-5 flex-1 items-stretch">
        <Section.Root>
          <Section.Header>
            <Section.Title>
              <ArchiveIcon className="size-3" />
              Backlog
            </Section.Title>

            <Section.IssueCount>32</Section.IssueCount>
          </Section.Header>

          <Section.Content>
            <div>Card 1</div>
            <div>Card 2</div>
            <div>Card 3</div>
          </Section.Content>
        </Section.Root>
      </main>
    </div>
  )
}
