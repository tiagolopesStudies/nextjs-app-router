export type IssueStatus = 'backlog' | 'todo' | 'in_progress' | 'done'

export interface IssueCard {
  id: string
  issueNumber: number
  title: string
  status: IssueStatus
  comments: number
}

export interface IssueDetails extends IssueCard {
  description: string
  createdAt: string
}

export interface IssueComment {
  id: string
  issueId: string
  author: {
    name: string
    avatar: string
  }
  text: string
  createdAt: string
}
