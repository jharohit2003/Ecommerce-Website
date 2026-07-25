import type { Request } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../utils/AppError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// Accepts either a `token` header (legacy, used by the current frontends)
// or a standard `Authorization: Bearer <token>` header.
const extractToken = (req: Request): string | undefined => {
  const header = req.headers.token
  if (typeof header === 'string' && header) return header
  const auth = req.headers.authorization
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return undefined
}

export const adminAuth = asyncHandler(async (req, res, next) => {
  const token = extractToken(req)
  if (!token) throw new AppError('Not authorised, login again', 401)
  const decoded = jwt.verify(token, env.JWT_SECRET)
  if (typeof decoded === 'string' || decoded.role !== 'admin') {
    throw new AppError('Not authorised, login again', 401)
  }
  next()
})

export const userAuth = asyncHandler(async (req, res, next) => {
  const token = extractToken(req)
  if (!token) throw new AppError('Not authorised, login again', 401)
  const decoded = jwt.verify(token, env.JWT_SECRET)
  if (typeof decoded === 'string' || !decoded.id) {
    throw new AppError('Not authorised, login again', 401)
  }
  ;(req as any).userId = decoded.id
  next()
})
