import express from 'express'
import { loginUser, registerUser, adminLogin } from './user.controller.js'
import validate from '../../middleware/validate.js'
import { registerSchema, loginSchema, adminLoginSchema } from './user.schema.js'

const userRouter = express.Router()

userRouter.post('/register', validate(registerSchema), registerUser)
userRouter.post('/login', validate(loginSchema), loginUser)
userRouter.post('/admin', validate(adminLoginSchema), adminLogin)

export default userRouter
