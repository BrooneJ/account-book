import db from '../lib/db'

class AccountBookService {
  private static instance: AccountBookService

  public static getInstance(): AccountBookService {
    if (!AccountBookService.instance) {
      AccountBookService.instance = new AccountBookService()
    }
    return AccountBookService.instance
  }

  async getAccountBooks(userId: string) {
    const accountBooks = await db.userAccount.findMany({
      orderBy: {
        account: {
          createdAt: 'desc',
        },
      },
      where: {
        userId,
      },
      include: {
        account: true,
      },
    })

    return accountBooks
  }

  async getAccountBook(accountBookId: string) {
    const accountBook = await db.account.findUnique({
      where: {
        id: accountBookId,
      },
      include: {
        userAccounts: {
          include: {
            user: true,
          },
        },
        transactions: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!accountBook) {
      throw new Error('Account book not found')
    }
    return accountBook
  }

  async createAccountBook(name: string, userId: string) {
    const accountBook = await db.account.create({
      data: {
        name,
        balance: 0,
        userAccounts: {
          create: {
            userId,
          },
        },
      },
      include: {
        userAccounts: true,
        transactions: true,
      },
    })

    return accountBook
  }
}

export default AccountBookService
