import { z } from 'zod'

type ErrorName = 'UserExistsError' | 'AuthenticationError' | 'UnknownError'
type ErrorInfo = {
  statusCode: number
  message: string
}

const statusCodeMap: Record<ErrorName, ErrorInfo> = {
  UserExistsError: {
    statusCode: 409,
    message: 'User already exists',
  },
  AuthenticationError: {
    statusCode: 401,
    message: 'Authentication failed',
  },
  UnknownError: {
    statusCode: 500,
    message: 'Unknown error',
  },
}

export default class AppError extends Error {
  public statusCode: number

  constructor(public name: ErrorName) {
    const info = statusCodeMap[name]
    super(info.message)
    this.statusCode = info.statusCode
  }
}

export const appErrorSchema = z.object({
  name: z.string(),
  message: z.string(),
  statusCode: z.number(),
})
