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
      const authResult = await userService.login(request.body)
      reply.setCookie('access_token', authResult.tokens.accessToken, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60),
      })
      reply.setCookie('refresh_token', authResult.tokens.refreshToken, {
        httpOnly: true,
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      return authResult
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
