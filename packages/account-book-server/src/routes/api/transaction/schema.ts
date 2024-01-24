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

const itemListSchema = z.array(
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
)

const paginationSchema = z.object({
  list: itemListSchema,
  endCursor: z.number().nullable(),
  endCursorDate: z.string().nullable(),
  hasNextPage: z.boolean(),
})

export const getTransactionsSchema = routeSchema({
  tags: ['transaction'],
  querystring: z.object({
    date: z.string().optional(),
    cursor: z.string().optional(),
  }),
  params: z.object({
    accountId: z.string(),
  }),
  response: {
    200: paginationSchema,
  },
})

export const getTransactionDetailSchema = routeSchema({
  tags: ['transaction'],
  params: z.object({
    accountId: z.string(),
    transactionId: z.string(),
  }),
  response: {
    200: z.object({
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
      user: z.object({
        username: z.string(),
      }),
      description: z.string().nullable(),
    }),
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
