import { FastifySchema } from 'fastify'

export function routeSchema<T extends FastifySchema>(schema: T): T {
  return schema
}
