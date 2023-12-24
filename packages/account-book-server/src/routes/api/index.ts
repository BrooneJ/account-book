import { FastifyPluginAsync } from 'fastify'
import authRoute from './auth'
import { meRoute } from './me'
import accountBookRoute from './accountBook'

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(meRoute, { prefix: '/me' })
  fastify.register(accountBookRoute, { prefix: '/account-book' })
}

export default api
