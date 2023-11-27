import { FastifyPluginAsync } from 'fastify'
import UserService from '../../../services/UserService'
import { loginSchema, registerSchema } from './schema'

const authRoute: FastifyPluginAsync = async (fastify) => {
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
