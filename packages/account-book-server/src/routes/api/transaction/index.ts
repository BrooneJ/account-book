import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import TransactionService from '../../../services/TransactionService'
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getThisMonthTransactionsSchema,
  getTopCategoriesByHalfYearSchema,
  getTransactionDetailSchema,
  getTransactionsByCategorySchema,
  getTransactionsByMonthSchema,
  getTransactionsSchema,
  updateTransactionSchema,
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
    '/:accountId/statistics',
    { schema: getTransactionsByMonthSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { date, type } = request.query
      return transactionService.getTransactionsByMonth({
        accountId,
        date,
        type,
      })
    },
  )

  fastify.get(
    '/:accountId/statistics/:categoryId',
    { schema: getTransactionsByCategorySchema },
    async (request, reply) => {
      const { accountId, categoryId } = request.params
      const { date, type } = request.query
      return transactionService.getTransactionsByCategory({
        accountId,
        date,
        type,
        categoryId,
      })
    },
  )

  fastify.get(
    '/:accountId/statistics/half-year',
    { schema: getTopCategoriesByHalfYearSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { date, type } = request.query
      return transactionService.getTopCategoriesByHalfYear({
        accountId,
        date,
        type,
      })
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

  fastify.get(
    '/:accountId/detail/:transactionId',
    { schema: getTransactionDetailSchema },
    async (request, reply) => {
      const { accountId, transactionId } = request.params
      return transactionService.getTransactionDetail({
        accountId,
        transactionId,
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

  fastify.patch(
    '/:accountId/:transactionId',
    { schema: updateTransactionSchema },
    async (request, reply) => {
      const { accountId, transactionId } = request.params
      const {
        type,
        userId,
        amount,
        category,
        financialSource,
        description,
        date,
      } = request.body

      return transactionService.updateTransaction(
        type,
        userId,
        accountId,
        transactionId,
        amount,
        category,
        financialSource,
        date,
        description,
      )
    },
  )

  fastify.delete(
    '/:accountId/:transactionId',
    { schema: deleteTransactionSchema },
    async (request, reply) => {
      const { accountId, transactionId } = request.params
      return transactionService.deleteTransaction(accountId, transactionId)
    },
  )
}

export default transactionRouter
