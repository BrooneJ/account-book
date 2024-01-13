import db from '../lib/db'
import AppError from '../lib/AppError'

type SourceObject = {
  income: string[]
  expense: string[]
}

class FinancialSourceService {
  private static instance: FinancialSourceService

  public static getInstance(): FinancialSourceService {
    if (!FinancialSourceService.instance) {
      FinancialSourceService.instance = new FinancialSourceService()
    }
    return FinancialSourceService.instance
  }

  async getSources(accountId: string) {
    const sources = await db.financialSource.findMany({
      where: {
        accountId,
      },
    })

    const sourceObject: SourceObject = sources.reduce(
      (acc, source) => {
        const key = source.type === 'income' ? 'income' : 'expense'
        acc[key].push(source.name)
        return acc
      },
      { income: [], expense: [] } as SourceObject,
    )

    return sourceObject
  }

  async createSource(accountId: string, type: string, name: string) {
    const existingSource = await db.financialSource.findFirst({
      where: {
        accountId,
        type,
        name,
      },
    })
    if (existingSource) {
      throw new AppError('SourceExistsError')
    }

    const source = await db.financialSource.create({
      data: {
        accountId,
        type,
        name,
      },
    })
    return source
  }
}

export default FinancialSourceService
