import Fastify from 'fastify'
import { swaggerUiConfig } from './config/swaggerUiConfig'
import { swaggerConfig } from './config/swagger'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import routes from './routes'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

const server = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)
server.register(fastifySwagger, swaggerConfig)
server.register(fastifySwaggerUi, swaggerUiConfig)

server.register(routes)
server.listen({ port: 4000 })
