import { z, ZodObject, ZodRawShape } from 'zod'

type ErrorName =
  | 'UserExistsError'
  | 'AuthenticationError'
  | 'UnknownError'
  | 'UnauthorizedError'

type ErrorInfo = {
  statusCode: number
  message: string
}

interface ErrorPayloads {
  UserExistsError: undefined
  AuthenticationError: undefined
  UnknownError: undefined
  UnauthorizedError: {
    isExpiredToken: boolean
  }
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
  UnauthorizedError: {
    statusCode: 401,
    message: 'Unauthorized',
  },
}

export default class AppError extends Error {
  public statusCode: number

  constructor(
    public name: ErrorName,
    public payload?: ErrorPayloads[ErrorName],
  ) {
    const info = statusCodeMap[name]
    super(info.message)
    this.statusCode = info.statusCode
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

export const appErrorSchema = z.object({
  name: z.string(),
  message: z.string(),
  statusCode: z.number(),
})

export function createAppErrorSchema<T, S extends ZodRawShape>(
  example: T,
  payloadSchema?: ZodObject<S>,
) {
  return {
    ...z.object({
      ...appErrorSchema.shape,
      ...(payloadSchema ? { payload: payloadSchema } : {}),
    }),
    example,
  }
}
