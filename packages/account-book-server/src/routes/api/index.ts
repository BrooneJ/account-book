import { FastifyPluginAsync } from 'fastify'
import authRoute from './auth'
import { meRoute } from './me'
import accountBookRoute from './accountBook'
import categoryRouter from './category/indext'
import sourceRouter from './financialSource'
import transactionRouter from './transaction'

const api: FastifyPluginAsync = async (fastify) => {
  fastify.register(authRoute, { prefix: '/auth' })
  fastify.register(meRoute, { prefix: '/me' })
  fastify.register(accountBookRoute, { prefix: '/account-book' })
  fastify.register(categoryRouter, { prefix: '/category' })
  fastify.register(sourceRouter, { prefix: '/financial-source' })
  fastify.register(transactionRouter, { prefix: '/transaction' })
}

export default api
