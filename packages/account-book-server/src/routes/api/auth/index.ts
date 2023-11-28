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
    { schema: registerSchema },
    async (request: FastifyRequest<{ Body: AuthBodyType }>, reply) => {
      const authResult = await userService.register(request.body)
      return authResult
    },
  )
}

export default authRoute
