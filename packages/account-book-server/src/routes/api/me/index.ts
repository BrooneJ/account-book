import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import { getMeSchema } from './schema'
import AppError from '../../../lib/AppError'
import securedPlugin from '../../../plugins/securedPlugin'

export const meRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  fastify.get('/', { schema: getMeSchema }, async (request, reply) => {
    return request.user
  })
}
