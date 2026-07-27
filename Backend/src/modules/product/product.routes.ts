import express from 'express'
import { listProduct, addProduct, removeProduct, singleProduct } from './product.controller.js'
import upload from '../../middleware/multer.js'
import { adminAuth } from '../../middleware/auth.js'
import validate from '../../middleware/validate.js'
import { addProductSchema, removeProductSchema, singleProductSchema } from './product.schema.js'

const productRouter = express.Router()

// validate runs after multer so text fields are populated on req.body
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ]),
  validate(addProductSchema),
  addProduct
)
productRouter.post('/remove', adminAuth, validate(removeProductSchema), removeProduct)
productRouter.post('/single', validate(singleProductSchema), singleProduct)
productRouter.get('/list', listProduct)

export default productRouter
