export type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'done'

export interface IssueCard {
  id: string
  issueNumber: number
  title: string
  status: IssueStatus
  comments: number
}

export interface IssuesListResponse {
  backlog: IssueCard[]
  todo: IssueCard[]
  in_progress: IssueCard[]
  done: IssueCard[]
}
