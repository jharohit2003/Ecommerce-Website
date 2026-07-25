import type { Request, Response, NextFunction } from 'express'
import type { ZodType } from 'zod'
import { AppError } from '../utils/AppError.js'

// Validates req.body against a Zod schema; throws a 400 AppError with the first
// message so the global error handler formats the response.
const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    throw new AppError(result.error.issues[0].message, 400)
  }
  req.body = result.data
  next()
}

export default validate
