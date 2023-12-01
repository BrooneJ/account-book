import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import { getMeSchema } from './schema'

export const meRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.get('/', { schema: getMeSchema }, async (request, reply) => {})
}
