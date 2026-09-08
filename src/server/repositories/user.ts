import type { SessionUser } from '../../types/auth'

export interface UserRecord extends SessionUser {
  password: string
}

const users: UserRecord[] = [
  { username: 'admin', password: 'admin', name: 'Admin User', role: 'admin' },
  { username: 'employee', password: 'employee', name: 'Employee User', role: 'employee' }
]

export async function getUser(username: string, password: string): Promise<UserRecord | null> {
  return users.find(user => user.username === username && user.password === password) ?? null
}

export async function getUsers(): Promise<UserRecord[]> {
  return users
}
