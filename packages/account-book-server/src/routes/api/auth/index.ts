import UserService from '../../../services/UserService'
import { loginSchema, registerSchema } from './schema'
import { FastifyPluginAsyncWithZod } from '../../../lib/types'

const authRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/login', { schema: loginSchema }, async (request, reply) => {
    return userService.login()
  })

  fastify.post(
    '/register',
    { schema: registerSchema },
    async (request, reply) => {
      return userService.register()
    },
  )
}

export default authRoute
