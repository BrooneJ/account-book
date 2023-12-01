import { FastifySchema } from 'fastify'
import { UserSchema } from '../../../schema/userSchema'

export const getMeSchema: FastifySchema = {
  response: {
    200: UserSchema,
  },
}
