import UserService from '../../../services/UserService'
import { loginSchema, registerSchema } from './schema'
import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import { FastifyRequest } from 'fastify'
import { AuthBodyType } from './types'

const authRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post(
    '/login',
    { schema: loginSchema },
    async (request: FastifyRequest<{ Body: AuthBodyType }>, reply) => {
      return userService.login(request.body)
    },
  )

  fastify.post(
    '/register',
    { schema: registerSchema },
    async (request: FastifyRequest<{ Body: AuthBodyType }>, reply) => {
      return userService.register(request.body)
    },
  )
}

export default authRoute
