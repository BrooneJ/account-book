type ErrorName =
  | "UserExistsError"
  | "AuthenticationError"
  | "UnknownError"
  | "UnauthorizedError"
  | "TokenExpiredError"
  | "BadRequestError"
  | "RefreshTokenError";

interface AppError {
  statusCode: number;
  message: string;
  name: ErrorName;
}

export function isAppError(error: any): error is AppError {
  return (
    error?.statusCode !== undefined &&
    error?.message !== undefined &&
    error?.name !== undefined
  );
}

export function extractError(error: any): AppError {
  if (isAppError(error)) {
    return error;
  }

  return {
    statusCode: 500,
    message: "Unknown error",
    name: "UnknownError",
  };
}
