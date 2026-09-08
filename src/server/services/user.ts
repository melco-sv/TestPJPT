import { getUsers } from '../repositories/user'
import type { SessionUser } from '../../types/auth'

export async function listUsers(): Promise<SessionUser[]> {
  const users = await getUsers()

  return users.map(({ username, name, role }) => ({ username, name, role }))
}
