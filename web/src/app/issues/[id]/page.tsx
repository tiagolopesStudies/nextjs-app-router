import type { Metadata } from 'next'
import { getIssue } from '@/http/get-issue'

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

export default async function IssueDetailsPage({ params }: IssueDetailsPageProps) {
  const { id } = await params
  const issue = await getIssue({ id })

  return <pre>{JSON.stringify(issue, null, 2)}</pre>
}
