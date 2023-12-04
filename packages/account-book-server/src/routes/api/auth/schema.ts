import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'
import { createAppErrorSchema } from '../../../lib/AppError'
import { UserSchema } from '../../../schema/userSchema'
import { FastifySchema } from 'fastify'

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

export const registerSchema: FastifySchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
})

export const loginSchema: FastifySchema = routeSchema({
  tags: ['auth'],
  body: AuthBody,
  response: {
    200: AuthResult,
    401: createAppErrorSchema({
      name: 'AuthenticationError',
      message: 'Authentication failed',
      statusCode: 401,
    }),
  },
})
