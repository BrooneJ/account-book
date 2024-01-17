import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import TransactionService from '../../../services/TransactionService'
import {
  createTransactionSchema,
  getThisMonthTransactionsSchema,
} from './schema'

const transactionRouter: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const transactionService = TransactionService.getInstance()

  fastify.get(
    '/',
    { schema: getThisMonthTransactionsSchema },
    async (request, reply) => {
      return transactionService.getTransactionsOnThisMonth()
    },
  )

  fastify.post(
    '/:accountId',
    { schema: createTransactionSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const {
        type,
        userId,
        amount,
        category,
        financialSource,
        description,
        date,
      } = request.body

      return transactionService.createTransaction(
        type,
        userId,
        accountId,
        amount,
        category,
        financialSource,
        date,
        description,
      )
    },
  )
}

export default transactionRouter
