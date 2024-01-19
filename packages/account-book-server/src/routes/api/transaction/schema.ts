import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'

export const createTransactionSchema = routeSchema({
  tags: ['transaction'],
  params: z.object({
    accountId: z.string(),
  }),
  body: z.object({
    type: z.string(),
    userId: z.string(),
    amount: z.number(),
    category: z.string(),
    financialSource: z.string(),
    description: z.string().optional(),
    date: z.string(),
  }),
})

export const getTransactionsSchema = routeSchema({
  tags: ['transaction'],
  params: z.object({
    accountId: z.string(),
  }),
  response: {
    200: z.array(
      z.object({
        id: z.number(),
        type: z.string(),
        amount: z.number(),
        date: z.date(),
        financialSource: z.object({
          name: z.string(),
        }),
        category: z.object({
          name: z.string(),
        }),
      }),
    ),
  },
})

export const getThisMonthTransactionsSchema = routeSchema({
  tags: ['transaction'],
  params: z.object({
    accountId: z.string(),
  }),
  response: {
    200: z.object({
      income: z.number(),
      expense: z.number(),
    }),
  },
})
