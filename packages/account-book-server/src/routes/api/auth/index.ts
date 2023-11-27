import {FastifyPluginAsync} from "fastify";
import UserService from "../../../services/UserService";

const authRoute: FastifyPluginAsync = async (fastify) => {
  const userService = UserService.getInstance()

  fastify.post('/login', async (request, reply) => {
    return userService.login()
  })

  fastify.post('/register', async (request, reply) => {
    return userService.register()
  })
}

export default authRoute