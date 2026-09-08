import { authenticate } from '../../services/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = await authenticate(body)

  await setSessionUser(event, user)

  return { user }
})
