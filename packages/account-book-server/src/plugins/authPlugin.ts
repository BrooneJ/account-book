import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { AccessTokenPayload, validateToken } from '../lib/tokens'
import jwt from 'jsonwebtoken'

const { JsonWebTokenError } = jwt
const authPluginAsync: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('user', null)
  fastify.addHook('preHandler', async (request, reply) => {
    console.log('request.cookies: ', request.headers.authorization)
    const { authorization } = request.headers
    if (!authorization || !authorization.includes('Bearer ')) {
      return
    }
    const token = authorization.split('Bearer ')[1]
    try {
      const decoded = validateToken<AccessTokenPayload>(token)
      console.log('decoded: ', decoded)
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        if (error.name === 'TokenExpiredError') {
          // @todo: handle token expired error
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
  }
}
