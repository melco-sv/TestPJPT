export type UserRole = 'admin' | 'employee'

export interface SessionUser {
  username: string
  name: string
  role: UserRole
}

declare module 'h3' {
  interface H3EventContext {
    user: SessionUser | null
  }
}
