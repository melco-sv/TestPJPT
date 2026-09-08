import { useSession, type H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { SessionUser } from '../../types/auth'

interface AuthSessionData {
  user?: SessionUser
}

function sessionOptions() {
  const { session } = useRuntimeConfig()

  return {
    name: session.name,
    password: session.password,
    maxAge: session.maxAge
  }
}

export async function getSessionUser(event: H3Event): Promise<SessionUser | null> {
  const session = await useSession<AuthSessionData>(event, sessionOptions())

  return session.data.user ?? null
}

export async function setSessionUser(event: H3Event, user: SessionUser): Promise<void> {
  const session = await useSession<AuthSessionData>(event, sessionOptions())

  await session.update({ user })
}

export async function clearSessionUser(event: H3Event): Promise<void> {
  const session = await useSession<AuthSessionData>(event, sessionOptions())

  await session.clear()
}
