import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import AccountBookService from '../../../services/AccountBookService'
import { getAccountBookSchema, getAccountBooksSchema } from './schema'

const accountBookRoute: FastifyPluginAsyncWithZod = async (fastify) => {
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
}

export default accountBookRoute
