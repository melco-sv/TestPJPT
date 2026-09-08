import type { FetchError } from 'ofetch'
import type { SessionUser } from '~/types/auth'

interface LoginPayload {
  username: string
  password: string
}

interface ApiErrorPayload {
  statusMessage?: string
  message?: string
  data?: {
    errors?: Record<string, string[] | undefined>
  }
}

export interface NormalizedError {
  message: string
  fields: Array<{ path: string, message: string }>
}

export function useAuth() {
  const user = useState<SessionUser | null>('auth:user', () => null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  async function login(payload: LoginPayload): Promise<void> {
    const response = await $fetch('/api/auth/login', { method: 'POST', body: payload })

    user.value = response.user
  }

  async function logout(): Promise<void> {
    await $fetch('/api/auth/logout', { method: 'POST' })

    user.value = null
    await navigateTo('/login')
  }

  async function fetchUser(): Promise<void> {
    const response = await useRequestFetch()('/api/auth/me')

    user.value = response.user
  }

  function normalizeError(error: unknown): NormalizedError {
    const payload = (error as FetchError<ApiErrorPayload>)?.data
    const errors = payload?.data?.errors ?? {}

    return {
      message: payload?.statusMessage ?? payload?.message ?? 'Something went wrong, please try again',
      fields: Object.entries(errors).flatMap(([path, messages]) =>
        messages?.length ? [{ path, message: messages[0] }] : []
      )
    }
  }

  return { user, isAdmin, login, logout, fetchUser, normalizeError }
}
