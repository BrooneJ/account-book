import Fastify from 'fastify'

const server = Fastify({ logger: true })

server.get('/ping', async (request, reply) => {
  return 'pong'
})

server.listen({ port: 4000 })
