import { FastifySchema } from 'fastify'
import { UserSchema } from '../../../schema/userSchema'
import { createAppErrorSchema } from '../../../lib/AppError'

export const getMeSchema: FastifySchema = {
  response: {
    200: UserSchema,
    401: createAppErrorSchema({
      name: 'UnauthorizedError',
      message: 'Unauthorized',
      statusCode: 401,
    }),
  },
}
