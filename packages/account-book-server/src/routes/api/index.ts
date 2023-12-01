import { FastifyPluginAsync } from 'fastify'
import authRoute from './auth'
import { meRoute } from './me'

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(meRoute, { prefix: '/me' })
}

export default api
