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
  }),
})
