import { routeSchema } from '../../../lib/routeSchema'
import { z } from 'zod'

const categoriesResult = z.object({
  income: z.array(z.string()),
  expense: z.array(z.string()),
})

export const getCategoriesSchema = routeSchema({
  tags: ['category'],
  params: z.object({
    accountId: z.string(),
  }),
  response: {
    200: categoriesResult,
  },
})

export const createCategorySchema = routeSchema({
  tags: ['category'],
  params: z.object({
    accountId: z.string(),
  }),
  body: z.object({
    type: z.string(),
    name: z.string(),
  }),
})
