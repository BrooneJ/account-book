import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import TransactionService from '../../../services/TransactionService'
import { createTransactionSchema } from './schema'

const transactionRouter: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const transactionService = TransactionService.getInstance()

  fastify.post(
    '/:accountId',
    { schema: createTransactionSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { type, userId, amount, category, financialSource, description } =
        request.body

      return transactionService.createTransaction(
        type,
        userId,
        accountId,
        amount,
        category,
        financialSource,
        description,
      )
    },
  )
}

export default transactionRouter
