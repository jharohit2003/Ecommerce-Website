import type { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError.js'
import { logger } from '../utils/logger.js'

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` })
}

// Global error handler. Must keep the 4-arg signature to be recognised by Express.
// Preserves the { success, message } response contract the frontends expect.
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500
  const message = err instanceof Error ? err.message : 'Internal server error'
  if (statusCode >= 500) logger.error(err)
  res.status(statusCode).json({ success: false, message })
}
