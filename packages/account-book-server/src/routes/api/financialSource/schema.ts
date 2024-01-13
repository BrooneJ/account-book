import { routeSchema } from '../../../lib/routeSchema'
import { z } from 'zod'

const sourcesResult = z.object({
  income: z.array(z.string()),
  expense: z.array(z.string()),
})

export const getSourcesSchema = routeSchema({
  tags: ['source'],
  params: z.object({
    accountId: z.string(),
  }),
  response: {
    200: sourcesResult,
  },
})

export const createSourceSchema = routeSchema({
  tags: ['source'],
  params: z.object({
    accountId: z.string(),
  }),
  body: z.object({
    type: z.string(),
    name: z.string(),
  }),
})
