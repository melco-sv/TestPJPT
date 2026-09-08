import { createError } from 'h3'
import { z, type ZodSchema } from 'zod'
import { getUser } from '../repositories/user'
import type { SessionUser } from '../../types/auth'

export const loginSchema: ZodSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required'
    })
    .min(4, { message: 'Invalid username' }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(4, { message: 'Password must be at least 4 characters' })
})

export interface LoginPayload {
  username: string
  password: string
}

export async function authenticate(payload: unknown): Promise<SessionUser> {
  const result = loginSchema.safeParse(payload)

  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Please check your username and password',
      data: { errors: result.error.flatten().fieldErrors }
    })
  }

  const { username, password } = result.data as LoginPayload
  const user = await getUser(username, password)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Username or password is incorrect'
    })
  }

  return { username: user.username, name: user.name, role: user.role }
}
