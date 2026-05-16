import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Board'
}

export default async function BoardPageLoading() {
  return <span>Carregando...</span>
}
