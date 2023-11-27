import UserService from '../../../services/UserService'
import { loginSchema, registerSchema } from './schema'
import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import { FastifyRequest } from 'fastify'
import { AuthBodyType } from './types'

const authRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/login', async (request, reply) => {
    return userService.login()
  })

  fastify.post(
    '/register',
    // { schema: registerSchema },
    async (request: FastifyRequest<{ Body: AuthBodyType }>, reply) => {
      return userService.register(request.body)
    },
  )
}

export default authRoute
