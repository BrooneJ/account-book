import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'

export const AuthBody = z.object({
  username: z.string(),
  password: z.string(),
})

const TokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const AuthResult = z.object({
  tokens: TokensSchema,
})

export const registerSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
  },
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
  },
})
