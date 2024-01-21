import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import TransactionService from '../../../services/TransactionService'
import {
  createTransactionSchema,
  getThisMonthTransactionsSchema,
  getTransactionsSchema,
} from './schema'

const transactionRouter: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const transactionService = TransactionService.getInstance()

  fastify.get(
    '/:accountId',
    { schema: getThisMonthTransactionsSchema },
    async (request, reply) => {
      const { accountId } = request.params
      return transactionService.getTransactionsOnThisMonth(accountId)
    },
  )

  fastify.get(
    '/:accountId/all',
    { schema: getTransactionsSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { date, cursor } = request.query
      return transactionService.getTransactions({
        accountId,
        date,
        cursor: cursor ? Number(cursor) : undefined,
      })
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
