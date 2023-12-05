import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import { getMeSchema } from './schema'
import AppError from '../../../lib/AppError'

export const meRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.get('/', { schema: getMeSchema }, async (request, reply) => {
    if (request.isExpiredToken) {
      throw new AppError('UnauthorizedError', {
        isExpiredToken: true,
      })
    }
    if (!request.user) {
      throw new AppError('UnauthorizedError', {
        isExpiredToken: false,
      })
    }
    return request.user
  })
}
