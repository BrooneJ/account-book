import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'
import { appErrorSchema } from '../../../lib/AppError'
import { UserSchema } from '../../../schema/userSchema'

export const AuthBody = z.object({
  username: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
})

const TokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const AuthResult = z.object({
  tokens: TokensSchema,
  user: UserSchema,
})

export const registerSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
    409: appErrorSchema,
  },
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
    401: appErrorSchema,
  },
})
