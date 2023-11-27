import Fastify from 'fastify'
import {swaggerUiConfig} from "./config/swaggerUiConfig";
import {swaggerConfig} from "./config/swagger";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import routes from "./routes";

const server = Fastify({ logger: true })

server.register(routes)
server.listen({ port: 4000 })

await server.register(fastifySwagger, swaggerConfig)
await server.register(fastifySwaggerUi, swaggerUiConfig)