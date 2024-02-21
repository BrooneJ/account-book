import { routeSchema } from '../../../lib/routeSchema'
import { z } from 'zod'

export const getThisMonthCalendarSchema = routeSchema({
  tags: ['calendar'],
  querystring: z.object({
    date: z.string().optional(),
  }),
  params: z.object({
    accountId: z.string(),
  }),
  response: {
    200: z.array(
      z.object({
        date: z.string(),
        list: z.array(
          z.object({
            id: z.number(),
            type: z.string(),
            amount: z.number(),
            date: z.string(),
            financialSource: z.string().optional(),
            category: z.string().optional(),
          }),
        ),
      }),
    ),
  },
})
