'use client'

import { SearchIcon } from 'lucide-react'
import { debounce, parseAsString, useQueryState } from 'nuqs'
import { Input } from '@/components/input'

export function SearchInput() {
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''))

  function handleChangeSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value, {
      limitUrlUpdates: event.target.value.trim() !== '' ? debounce(500) : undefined
    })
  }

  return (
    <div className="relative">
      <SearchIcon className="absolute size-4 text-navy-200 left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />

      <Input
        type="text"
        placeholder="Search for features..."
        className="w-67.5 pl-8"
        value={search}
        onChange={handleChangeSearch}
      />
    </div>
  )
}
