'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ThumbsUpIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { toggleIssueLike } from '@/http/toggle-issue-like'
import type { Interaction } from '@/types'
import { Button } from './button'

interface LikeButtonProps extends ComponentProps<'button'> {
  issueId: string
  initialLikes: number
  initialLiked?: boolean
}

interface IssueInteractions {
  interactions: Interaction[]
}

export function LikeButton({
  issueId,
  initialLikes,
  initialLiked = false,
  ...props
}: LikeButtonProps) {
  const queryClient = useQueryClient()
  const { mutate: onToggleLike, isPending } = useMutation({
    mutationFn: () => toggleIssueLike({ issueId }),
    onMutate: async () => {
      const previousData = queryClient.getQueriesData<IssueInteractions>({
        queryKey: ['issue-likes']
      })

      queryClient.setQueriesData<IssueInteractions>(
        {
          queryKey: ['issue-likes']
        },
        (old) => {
          if (!old) {
            return undefined
          }

          return {
            ...old,
            interactions: old.interactions.map((interaction) => {
              if (interaction.issueId === issueId) {
                return {
                  ...interaction,
                  isLiked: !interaction.isLiked,
                  likesCount: interaction.isLiked
                    ? interaction.likesCount - 1
                    : interaction.likesCount + 1
                }
              }

              return interaction
            })
          }
        }
      )

      return { previousData }
    },
    onError: async (_err, _params, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData<IssueInteractions>(queryKey, data)
        }
      }
    }
  })

  function handleToggleLike(event: React.MouseEvent) {
    event.preventDefault()
    event.stopPropagation()

    onToggleLike()
  }

  const liked = initialLiked

  return (
    <Button
      data-liked={liked}
      className="data-[liked=true]:bg-indigo-600 data-[liked=true]:text-white data-[liked=true]:hover:bg-indigo-500"
      aria-label={liked ? 'Unlike' : 'Like'}
      onClick={handleToggleLike}
      disabled={isPending}
      {...props}
    >
      <ThumbsUpIcon className="size-3" />
      <span className="text-sm">{initialLikes}</span>
    </Button>
  )
}
