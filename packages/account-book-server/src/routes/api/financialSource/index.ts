import { FastifyPluginAsyncWithZod } from '../../../lib/types'
import securedPlugin from '../../../plugins/securedPlugin'
import {
  getSourcesSchema,
  createSourceSchema,
  deleteSourceSchema,
} from './schema'
import FinancialSourceService from '../../../services/FinancialSourceService'

const sourceRouter: FastifyPluginAsyncWithZod = async (fastify) => {
  fastify.register(securedPlugin)
  const financialSourceService = FinancialSourceService.getInstance()

  fastify.get(
    '/:accountId',
    { schema: getSourcesSchema },
    async (request, reply) => {
      const { accountId } = request.params
      return financialSourceService.getSources(accountId)
    },
  )

  fastify.post(
    '/:accountId',
    { schema: createSourceSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { type, name } = request.body
      return financialSourceService.createSource(accountId, type, name)
    },
  )

  fastify.delete(
    '/:accountId',
    { schema: deleteSourceSchema },
    async (request, reply) => {
      const { accountId } = request.params
      const { type, name } = request.body
      return financialSourceService.deleteSource(accountId, type, name)
    },
  )
}

export default sourceRouter
