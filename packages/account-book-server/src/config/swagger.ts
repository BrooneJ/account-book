import { SwaggerOptions } from '@fastify/swagger'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: 'SampleApi',
      description: 'Sample backend service',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
}
