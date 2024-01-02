import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import AccountBookService from '../../../services/AccountBookService'
import {
  createAccountBookSchema,
  getAccountBookSchema,
  getAccountBooksSchema,
} from './schema'
import securedPlugin from '../../../plugins/securedPlugin'

const accountBookRoute: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const accountBookService = AccountBookService.getInstance()

  fastify.get(
    '/',
    { schema: getAccountBooksSchema },
    async (request, reply) => {
      const userId = request.query.userId ?? request.user?.id
      return accountBookService.getAccountBooks(userId)
    },
  )

  fastify.get(
    '/:id',
    { schema: getAccountBookSchema },
    async (request, reply) => {
      const { id } = request.params
      return accountBookService.getAccountBook(id)
    },
  )

  fastify.post(
    '/',
    {
      schema: createAccountBookSchema,
    },
    async (request, reply) => {
      const { name } = request.body
      const userId = request.user?.id!
      return accountBookService.createAccountBook(name, userId)
    },
  )
}

export default accountBookRoute
