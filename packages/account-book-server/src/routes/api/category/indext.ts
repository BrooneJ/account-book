import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import CategoryService from '../../../services/CategoryService'
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategoriesSchema,
} from './schema'

const categoryRouter: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const categoryService = CategoryService.getInstance()

  fastify.get(
    '/:accountId',
    { schema: getCategoriesSchema },
    async (request, reply) => {
      const { accountId } = request.params
      return categoryService.getCategories(accountId)
    },
  )

  fastify.post(
    '/:accountId',
    { schema: createCategorySchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { type, name } = request.body
      return categoryService.createCategory(accountId, type, name)
    },
  )

  fastify.patch(
    '/:accountId',
    { schema: deleteCategorySchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { type, id } = request.body
      return categoryService.deleteCategory(accountId, type, id)
    },
  )
}

export default categoryRouter
