import UserService from '../../../services/UserService'
import { loginSchema, refreshTokenSchema, registerSchema } from './schema'
import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthBodyType } from './types'
import AppError from '../../../lib/AppError'

const authRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post(
    '/login',
    { schema: loginSchema },
    async (request: FastifyRequest<{ Body: AuthBodyType }>, reply) => {
      const authResult = await userService.login(request.body)
      setTokenCookie(reply, authResult.tokens)
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

  fastify.post(
    '/refresh',
    { schema: refreshTokenSchema },
    async (
      request: FastifyRequest<{ Body: { refreshToken?: string } }>,
      reply,
    ) => {
      const refreshToken =
        request.body.refreshToken ?? request.cookies.refresh_token ?? ''
      if (!refreshToken) {
        throw new AppError('BadRequestError')
      }
      const tokens = await userService.refreshTokens(refreshToken)
      setTokenCookie(reply, tokens)
      return tokens
    },
  )
}

function setTokenCookie(
  reply: FastifyReply,
  tokens: { accessToken: string; refreshToken: string },
) {
  reply.setCookie('access_token', tokens.accessToken, {
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60),
  })
  reply.setCookie('refresh_token', tokens.refreshToken, {
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  })
}

export default authRoute
