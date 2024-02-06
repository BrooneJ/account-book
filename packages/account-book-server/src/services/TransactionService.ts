import db from '../lib/db'
import AppError from '../lib/AppError'
import moment from 'moment-timezone'

class TransactionService {
  private static instance: TransactionService

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService()
    }
    return TransactionService.instance
  }

  async getTransactionsOnThisMonth(accountId: string) {
    const timezone = moment.tz.guess()
    const now = moment().tz(timezone).format('YYYY-MM-DD')
    const startOfMonth = moment.utc(now).startOf('month').toISOString()
    const endOfMonth = moment.utc(now).endOf('month').toISOString()

    const result = await db.transaction.findMany({
      where: {
        accountId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })

    const incomeSum = result
      .filter((transaction) => transaction.type === 'income')
      .reduce((acc, cur) => acc + cur.amount, 0)
    const expenseSum = result
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, cur) => acc + cur.amount, 0)

    const resultObject = {
      income: incomeSum,
      expense: expenseSum,
    }

    return resultObject
  }

  async getTransactionsByMonth({
    accountId,
    date,
    type,
  }: {
    accountId: string
    date?: string
    type: 'income' | 'expense'
  }) {
    if (!date) {
      const timezone = moment.tz.guess()
      date = moment().tz(timezone).format('YYYY-MM-DD')
    }
    const startOfMonth = moment.utc(date).startOf('month').toISOString()
    const endOfMonth = moment.utc(date).endOf('month').toISOString()

    const result: Result = await db.transaction.findMany({
      where: {
        accountId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      include: {
        financialSource: true,
        category: true,
      },
      orderBy: [
        {
          date: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    })

    type Result = {
      id: number
      amount: number
      type: string
      financialSource: {
        id: string
        name: string
        type: string
      }
      category: {
        id: string
        name: string
        type: string
      }
    }[]

    type Props = {
      result: Result
      type: 'income' | 'expense'
    }

    const categoryData = ({ result, type }: Props) => {
      const resultObj: {
        id: string
        label: string
        value: number
        count: number
      }[] = []

      result.map((transaction) => {
        const { id, name } = transaction.category
        const amount = transaction.amount
        if (type !== transaction.type) return
        if (resultObj.some((item) => item.id === id)) {
          const index = resultObj.findIndex((item) => item.id === id)
          resultObj[index].value += amount
          resultObj[index].count += 1
          return
        }
        resultObj.push({ id, label: name, value: amount, count: 1 })
      })
      return resultObj
    }

    const sortedResult = categoryData({ result, type }).sort(
      (a, b) => b.value - a.value,
    )
    const topTen = sortedResult.slice(0, 8)
    return topTen
  }

  async getTransactionsByCategory({
    accountId,
    categoryId,
    date,
    type,
  }: {
    accountId: string
    categoryId: string
    date?: string
    type: 'income' | 'expense'
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
        categoryId: categoryId,
        type,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      include: {
        financialSource: true,
        category: true,
      },
      orderBy: [
        {
          date: 'desc',
        },
        {
          id: 'desc',
        },
      ],
    })

    return result
  }

  async getTopCategoriesByHalfYear({
    accountId,
    date,
    type,
  }: {
    accountId: string
    date?: string
    type: 'income' | 'expense'
  }) {
    if (!date) {
      const timezone = moment.tz.guess()
      date = moment().tz(timezone).format('YYYY-MM-DD')
    }
    const startOfSizeMonthsAgo = moment
      .utc(date)
      .subtract(5, 'months')
      .startOf('month')
      .toISOString()
    const endOfMonth = moment.utc(date).endOf('month').toISOString()

    const lastSixMonths = Array.from({ length: 6 }, (_, i) =>
      moment
        .utc(date)
        .subtract(i, 'months')
        .startOf('month')
        .toISOString()
        .slice(0, 7),
    ).reverse()

    const transactions = await db.transaction.groupBy({
      by: ['categoryId', 'date'],
      _sum: {
        amount: true,
      },
      where: {
        accountId,
        type,
        date: {
          gte: startOfSizeMonthsAgo,
          lte: endOfMonth,
        },
      },
      orderBy: {
        _sum: {
          amount: 'desc',
        },
      },
    })

    type CategoryAmount = {
      categoryId: string
      amount: number
    }

    type MonthlyData = {
      [key: string]: CategoryAmount[]
    }

    type Transaction = {
      date: Date
      categoryId: string
      _sum: {
        amount: number | null
      }
    }

    const monthlyData = {} as MonthlyData
    transactions.forEach((transaction: Transaction) => {
      const month = transaction.date.toISOString().slice(0, 7) // 'YYYY-MM'
      if (!monthlyData[month]) {
        monthlyData[month] = []
      }
      const index = monthlyData[month].findIndex(
        (item) => item.categoryId === transaction.categoryId,
      )
      if (index !== -1) {
        monthlyData[month][index].amount += transaction._sum.amount!
      } else {
        if (monthlyData[month].length >= 8) return
        monthlyData[month].push({
          categoryId: transaction.categoryId,
          amount: transaction._sum.amount!,
        })
      }
    })

    if (Object.keys(monthlyData).length < 6) {
      for (let month of lastSixMonths) {
        if (!monthlyData[month]) {
          monthlyData[month] = []
        }
      }
    }

    type Result = {
      date: string
    } & Record<string, number>

    type ResultArray = Result[]

    const results = [] as ResultArray
    const categoryListSet = new Set<string>()

    for (let month in monthlyData) {
      const topCategories = monthlyData[month]
      const result = { date: month } as Result
      for (let category of topCategories) {
        const categoryData = await db.category.findUnique({
          where: {
            id: category.categoryId,
          },
        })
        if (categoryData) {
          categoryListSet.add(categoryData.name)
          if (!result[categoryData.name]) {
            result[categoryData.name] = 0
          }
          result[categoryData.name] += category.amount
        }
      }
      results.push(result)
    }

    const categoryList = Array.from(categoryListSet)

    const sortedResults = results.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })

    return { result: sortedResults, list: categoryList }
  }

  async getTransactions({
    accountId,
    date,
    cursor,
  }: {
    accountId: string
    date?: string
    cursor?: number
  }) {
    const limit = 10

    // throw error if not yyyy-mm-dd format
    if (date && !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new AppError('BadRequestError')
    }

    if (!date) {
      const timezone = moment.tz.guess()
      date = moment().tz(timezone).format().split('+')[0].concat('.000Z')
    }

    const [totalCount, list] = await Promise.all([
      db.transaction.count({
        where: {
          accountId,
          OR: [
            {
              date: {
                lt: new Date(date),
              },
            },
            {
              date: {
                lte: new Date(date),
              },
              id: {
                lt: cursor,
              },
            },
          ],
        },
      }),
      db.transaction.findMany({
        where: {
          accountId,
          OR: [
            {
              date: {
                lt: new Date(date),
              },
            },
            {
              date: {
                lte: new Date(date),
              },
              id: {
                lt: cursor,
              },
            },
          ],
        },
        include: {
          financialSource: true,
          category: true,
        },
        orderBy: [
          {
            date: 'desc',
          },
          {
            id: 'desc',
          },
        ],
        take: limit,
      }),
    ])

    const hasNextPage = totalCount > limit
    const endCursor = list.at(-1)?.id ?? null
    const endCursorDate =
      list[list.length - 1]?.date.toISOString().split('T')[0] ?? null

    return {
      list,
      endCursor,
      endCursorDate,
      hasNextPage,
    }
  }

  async getTransactionDetail({
    accountId,
    transactionId,
  }: {
    accountId: string
    transactionId: string
  }) {
    const result = await db.transaction.findUnique({
      where: {
        id: parseInt(transactionId),
        accountId,
      },
      include: {
        financialSource: true,
        category: true,
        user: true,
      },
    })

    if (!result) {
      throw new AppError('BadRequestError')
    }

    return result
  }

  async createTransaction(
    type: string,
    userId: string,
    accountId: string,
    amount: number,
    category: string,
    financialSource: string,
    dateString: string,
    description?: string,
  ) {
    const categoryResult = await db.category.findFirst({
      where: {
        name: category,
      },
    })

    if (!categoryResult) {
      throw new Error('Category not found')
    }

    const sourceResult = await db.financialSource.findFirst({
      where: {
        name: financialSource,
      },
    })

    if (!sourceResult) {
      throw new Error('Financial source not found')
    }

    const date = new Date(dateString)

    const transaction = await db.transaction.create({
      data: {
        type,
        userId,
        accountId,
        categoryId: categoryResult.id,
        amount,
        financialSourceId: sourceResult.id,
        description,
        date,
      },
    })

    if (type === 'expense') {
      await db.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      })
    } else if (type === 'income') {
      await db.account.update({
        where: {
          id: accountId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      })
    }

    return transaction
  }

  async updateTransaction(
    type: string,
    userId: string,
    accountId: string,
    transactionId: string,
    amount: number,
    category: string,
    financialSource: string,
    dateString: string,
    description?: string,
  ) {
    const categoryResult = await db.category.findFirst({
      where: {
        name: category,
      },
    })

    if (!categoryResult) {
      throw new Error('Category not found')
    }

    const sourceResult = await db.financialSource.findFirst({
      where: {
        name: financialSource,
      },
    })

    if (!sourceResult) {
      throw new Error('Financial source not found')
    }

    const date = new Date(dateString)

    const transaction = await db.transaction.update({
      where: {
        id: parseInt(transactionId),
        accountId,
      },
      data: {
        type,
        userId,
        categoryId: categoryResult.id,
        amount,
        financialSourceId: sourceResult.id,
        description,
        date,
      },
    })

    return transaction
  }

  async deleteTransaction(accountId: string, transactionId: string) {
    const transaction = await db.transaction.findUnique({
      where: {
        id: parseInt(transactionId),
        accountId,
      },
    })

    if (!transaction) {
      throw new AppError('BadRequestError')
    }

    await db.transaction.delete({
      where: {
        accountId,
        id: parseInt(transactionId),
      },
    })

    return transaction
  }
}

export default TransactionService
