import db from '../lib/db'
import AppError from '../lib/AppError'

type CategoryObject = {
  income: string[]
  expense: string[]
}

class CategoryService {
  private static instance: CategoryService

  public static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService()
    }
    return CategoryService.instance
  }

  async getCategories(accountId: string) {
    const categories = await db.category.findMany({
      where: {
        accountId,
      },
    })

    const categoryObject: CategoryObject = categories.reduce(
      (acc, category) => {
        const key = category.type === 'income' ? 'income' : 'expense'
        acc[key].push(category.name)
        return acc
      },
      { income: [], expense: [] } as CategoryObject,
    )

    return categoryObject
  }

  async createCategory(accountId: string, type: string, name: string) {
    const existingCategory = await db.category.findFirst({
      where: {
        accountId,
        type,
        name,
      },
    })
    if (existingCategory) {
      throw new AppError('CategoryExistsError')
    }

    const category = await db.category.create({
      data: {
        accountId,
        type,
        name,
      },
    })
    return category
  }
}

export default CategoryService
