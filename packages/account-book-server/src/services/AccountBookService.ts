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
    console.log('accountBooks: ', accountBooks)
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
    console.log('accountBook: ', accountBook)
    if (!accountBook) {
      throw new Error('Account book not found')
    }
    return accountBook
  }
}

export default AccountBookService
