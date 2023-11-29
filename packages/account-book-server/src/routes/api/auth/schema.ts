import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'
import { appErrorResponseSchema } from '../../../lib/AppError'
import { zodToJsonSchema } from 'zod-to-json-schema'

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
const AuthBodySchema = zodToJsonSchema(AuthBody)

const TokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
})

const AuthResult = z.object({
  tokens: TokensSchema,
  user: UserSchema,
})
const AuthResultSchema = zodToJsonSchema(AuthResult)

export const registerSchema = routeSchema({
  tags: ['auth'],
  body: AuthBodySchema,
  response: {
    200: AuthResultSchema,
    409: {
      ...appErrorResponseSchema,
      example: {
        name: 'UserExistsError',
        message: 'User already exists',
        statusCode: 409,
      },
    },
  },
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: AuthBodySchema,
  response: {
    200: AuthResultSchema,
    401: {
      ...appErrorResponseSchema,
      example: {
        name: 'AuthenticationError',
        message: 'Authentication failed',
        statusCode: 401,
      },
    },
  },
})
