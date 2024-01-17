import db from '../lib/db'

class TransactionService {
  private static instance: TransactionService

  public static getInstance(): TransactionService {
    if (!TransactionService.instance) {
      TransactionService.instance = new TransactionService()
    }
    return TransactionService.instance
  }

  async getTransactionsOnThisMonth() {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const result = await db.transaction.findMany({
      where: {
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
}

export default TransactionService
