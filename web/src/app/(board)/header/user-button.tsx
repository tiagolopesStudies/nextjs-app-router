'use client'

import { Loader2Icon, LogInIcon, UserIcon } from 'lucide-react'
import Image from 'next/image'
import { authClient } from '@/lib/auth-client'

export function UserButton() {
  const { data: session, isPending } = authClient.useSession()

  async function handleSignIn() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: `${window.location.href}/`
    })
  }

  async function handleLogout() {
    await authClient.signOut()
  }

  return (
    <>
      {isPending ? (
        <div className="size-8 rounded-full cursor-pointer bg-navy-700 border-navy-500 flex items-center justify-center">
          <Loader2Icon className="size-3.5 text-navy-200 animate-spin" />
        </div>
      ) : session?.user ? (
        <button
          type="button"
          onClick={handleLogout}
          className="size-8 rounded-full overflow-hidden"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={0}
              height={0}
              draggable={false}
              className="size-8 rounded-full cursor-pointer"
            />
          ) : (
            <UserIcon className="size-3.5 text-navy-200" />
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleSignIn}
          className="size-8 cursor-pointer rounded-full bg-navy-700 border border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150"
        >
          <LogInIcon className="size-3.5 text-navy-200" />
        </button>
      )}
    </>
  )
}
