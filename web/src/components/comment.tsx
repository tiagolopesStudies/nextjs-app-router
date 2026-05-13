import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface CommentRootProps extends ComponentProps<'div'> {}

export function CommentRoot({ className, ...props }: CommentRootProps) {
  return <div className={twMerge('flex items-start gap-2', className)} {...props} />
}

interface CommentAvatarProps extends ComponentProps<'img'> {}

export function CommentAvatar({ className, alt = '', ...props }: CommentAvatarProps) {
  return (
    // biome-ignore lint/performance/noImgElement: Gitbug already optmizes the image
    <img alt={alt} className={twMerge('size-8 rounded-full', className)} {...props} />
  )
}

interface CommentContentProps extends ComponentProps<'div'> {}

export function CommentContent({ className, ...props }: CommentContentProps) {
  return (
    <div
      className={twMerge(
        'flex-1 px-3 py-2.5 rounded-lg bg-navy-700 border-[0.5px] border-navy-600 flex flex-col gap-1',
        className
      )}
      {...props}
    />
  )
}

interface CommentHeaderProps extends ComponentProps<'div'> {}

export function CommentHeader({ className, ...props }: CommentHeaderProps) {
  return <div className={twMerge('flex items-baseline gap-1', className)} {...props} />
}

interface CommentAuthorProps extends ComponentProps<'span'> {}

export function CommentAuthor({ className, ...props }: CommentAuthorProps) {
  return <span className={twMerge('text-sm font-medium', className)} {...props} />
}

interface CommentTimeProps extends ComponentProps<'span'> {}

export function CommentTime({ className, ...props }: CommentTimeProps) {
  return <span className={twMerge('text-xs text-navy-200', className)} {...props} />
}

interface CommentTextProps extends ComponentProps<'p'> {}

export function CommentText({ className, ...props }: CommentTextProps) {
  return (
    <p
      className={twMerge('text-sm leading-relaxed text-navy-100', className)}
      {...props}
    />
  )
}

export const Comment = {
  Root: CommentRoot,
  Header: CommentHeader,
  Content: CommentContent,
  Text: CommentText,
  Author: CommentAuthor,
  Avatar: CommentAvatar,
  Time: CommentTime
}
