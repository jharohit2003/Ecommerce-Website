import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from './user.model.js'
import { env } from '../../config/env.js'
import { AppError } from '../../utils/AppError.js'
import { asyncHandler } from '../../utils/asyncHandler.js'

const createToken = (id: string) => jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '7d' })

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const exists = await userModel.findOne({ email })
  if (exists) throw new AppError('User already exists', 409)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await new userModel({ name, email, password: hashedPassword }).save()

  res.json({ success: true, token: createToken(user._id) })
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await userModel.findOne({ email })
  if (!user) throw new AppError('User does not exist', 404)

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new AppError('Invalid credentials', 401)

  res.json({ success: true, token: createToken(user._id) })
})

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (email !== env.ADMIN_EMAIL || password !== env.ADMIN_PASSWORD) {
    throw new AppError('Invalid credentials', 401)
  }
  const token = jwt.sign({ role: 'admin', email }, env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token })
})
