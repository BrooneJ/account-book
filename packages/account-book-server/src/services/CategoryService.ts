import db from '../lib/db'

type Category = {
  id: string
  name: string
}

type CategoryObject = {
  income: Category[]
  expense: Category[]
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
        if (category.isArchived) return acc
        acc[key].push({ id: category.id, name: category.name })
        return acc
      },
      { income: [], expense: [] } as CategoryObject,
    )

    return categoryObject
  }

  async createCategory(accountId: string, type: string, name: string) {
    const category = await db.category.create({
      data: {
        accountId,
        type,
        name,
      },
    })
    return category
  }

  async deleteCategory(accountId: string, type: string, id: string[]) {
    await db.category.updateMany({
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

export default CategoryService
