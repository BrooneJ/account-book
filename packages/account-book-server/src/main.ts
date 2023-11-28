import Fastify from 'fastify'
import { swaggerUiConfig } from './config/swaggerUiConfig'
import { swaggerConfig } from './config/swagger'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import routes from './routes'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import AppError from './lib/AppError'
import 'dotenv/config'

const server = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)
server.register(fastifySwagger, swaggerConfig)
server.register(fastifySwaggerUi, swaggerUiConfig)

server.setErrorHandler((error, request, reply) => {
  reply.statusCode = error.statusCode ?? 500
  if (error instanceof AppError) {
    return {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
    }
  }
  console.log({ name: error.name })
  return error
})

server.register(routes)
server.listen({ port: 4000 })
