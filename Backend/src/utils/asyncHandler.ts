import type { Request, Response, NextFunction } from 'express'

// Wraps an async route handler so rejected promises reach the global error handler.
type Handler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>

export const asyncHandler = (fn: Handler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
