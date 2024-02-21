import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import CalendarService from '../../../services/CalendarService'
import { getThisMonthCalendarSchema } from './schema'

const calendarRouter: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const calendarService = CalendarService.getInstance()

  fastify.get(
    '/:accountId/calendar',
    { schema: getThisMonthCalendarSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { date } = request.query
      return calendarService.getDataByMonth({ accountId, date })
    },
  )
}

export default calendarRouter
