import db from '../lib/db'
import AppError from '../lib/AppError'

type Source = {
  id: string
  name: string
}

type SourceObject = {
  income: Source[]
  expense: Source[]
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
        if (source.isArchived) return acc
        acc[key].push({ id: source.id, name: source.name })
        return acc
      },
      { income: [], expense: [] } as SourceObject,
    )

    return sourceObject
  }

  async createSource(accountId: string, type: string, name: string) {
    const isExist = await db.financialSource.findFirst({
      where: {
        accountId,
        type,
        name,
      },
    })

    if (isExist) {
      await db.financialSource.update({
        where: {
          accountId,
          type,
          id: isExist.id,
        },
        data: {
          isArchived: false,
        },
      })
      return isExist
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

  async deleteSource(accountId: string, type: string, id: string[]) {
    await db.financialSource.updateMany({
      where: {
        accountId,
        type,
        id: {
          in: id,
        },
      },
      data: {
        isArchived: true,
      },
    })
  }
}

export default FinancialSourceService
