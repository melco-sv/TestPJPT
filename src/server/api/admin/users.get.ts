import { listUsers } from '../../services/user'

export default defineEventHandler(async () => {
  const users = await listUsers()

  return { users }
})
