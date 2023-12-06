import { FastifyPluginAsyncWithZod } from '../lib/types'
import AppError from '../lib/AppError'
import fp from 'fastify-plugin'

const securedPluginAsync: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.addHook('preHandler', async (request, reply) => {
    if (request.isExpiredToken) {
      throw new AppError('TokenExpiredError')
    }
    if (!request.user) {
      throw new AppError('UnauthorizedError')
    }
  })
}

const securedPlugin = fp(securedPluginAsync, {
  name: 'securedPlugin',
})

export default securedPlugin
