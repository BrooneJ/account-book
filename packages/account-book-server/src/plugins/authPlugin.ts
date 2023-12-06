import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { AccessTokenPayload, validateToken } from '../lib/tokens'
import jwt from 'jsonwebtoken'

const { JsonWebTokenError } = jwt
const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.decorateRequest('isExpiredToken', false)
  fastify.addHook('preHandler', async (request, reply) => {
    const token =
      request.headers.authorization?.split('Bearer ')[1] ??
      request.cookies.access_token

    if (!token) return

    try {
      const decoded = await validateToken<AccessTokenPayload>(token)
      request.user = {
        id: decoded.userId,
        username: decoded.username,
        email: decoded.email,
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') {
          request.isExpiredToken = true
          return
        }
      }
      throw error
    }
  })
}

export const authPlugin = fp(authPluginAsync, {
  name: 'authPlugin',
})

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string
      username: string
      email: string
    } | null
    isExpiredToken: boolean
  }
}
