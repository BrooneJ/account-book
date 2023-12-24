import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'

const accountBooksResult = z.array(
  z.object({
    account: z.object({
      id: z.string(),
      name: z.string(),
      balance: z.number(),
    }),
  }),
)

const transactionsResult = z.array(
  z.object({
    amount: z.number(),
    description: z.string().nullish(),
    user: z.object({
      username: z.string(),
    }),
    category: z
      .object({
        name: z.string(),
      })
      .nullish(),
  }),
)

const accountBookResult = z.object({
  id: z.string(),
  name: z.string(),
  balance: z.number(),
  userAccounts: z.array(
    z.object({
      user: z.object({
        username: z.string(),
      }),
    }),
  ),
  transactions: transactionsResult,
})

export const getAccountBooksSchema = routeSchema({
  tags: ['account-book'],
  querystring: z.object({
    userId: z.string(),
  }),
  response: {
    200: accountBooksResult,
  },
})

export const getAccountBookSchema = routeSchema({
  tags: ['account-book'],
  params: z.object({
    id: z.string(),
  }),
  response: {
    200: accountBookResult,
  },
})
