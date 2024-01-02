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
    createdAt: z.date(),
    type: z.string(),
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

const createAccountBookResult = z.object({
  id: z.string(),
  name: z.string(),
  balance: z.number(),
  userAccounts: z.array(
    z.object({
      userId: z.string(),
      accountId: z.string(),
    }),
  ),
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

export const createAccountBookSchema = routeSchema({
  tags: ['account-book'],
  body: z.object({
    name: z.string(),
  }),
  response: {
    200: {
      ...createAccountBookResult,
      example: {
        id: '1',
        name: 'Account Book 1',
        balance: 1000,
        userAccounts: [
          {
            userId: '1',
            accountId: '1',
          },
        ],
      },
    },
  },
})
