import moment from 'moment-timezone'
import db from '../lib/db'

class CalendarService {
  private static instance: CalendarService

  public static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService()
    }
    return CalendarService.instance
  }

  async getDataByMonth({
    accountId,
    date,
  }: {
    accountId: string
    date: string | undefined
  }) {
    if (!date) {
      const timezone = moment.tz.guess()
      date = moment().tz(timezone).format('YYYY-MM-DD')
    }
    const startOfMonth = moment.utc(date).startOf('month').toISOString()
    const endOfMonth = moment.utc(date).endOf('month').toISOString()

    const result = await db.transaction.findMany({
      where: {
        accountId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    const acc = []

    for (const cur of result) {
      const date = moment(cur.date).format('YYYY-MM-DD')
      const index = acc.findIndex((item) => item.date === date)

      // Perform asynchronous operations
      const categoryData = await db.category.findFirst({
        where: {
          id: cur.categoryId,
        },
      })
      const financialSourceData = await db.financialSource.findFirst({
        where: {
          id: cur.financialSourceId,
        },
      })

      const listDataFormat = {
        id: cur.id,
        type: cur.type,
        amount: cur.amount,
        description: cur.description,
        date,
        category: categoryData ? categoryData.name : undefined,
        financialSource: financialSourceData
          ? financialSourceData.name
          : undefined,
      }

      if (index === -1) {
        acc.push({
          date,
          list: [listDataFormat],
        })
      } else {
        acc[index].list.push(listDataFormat)
      }
    }

    return acc
  }
}

export default CalendarService
