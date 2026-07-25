import { v2 as cloudinary } from 'cloudinary'
import productModel from './product.model.js'
import { AppError } from '../../utils/AppError.js'
import { asyncHandler } from '../../utils/asyncHandler.js'

export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, subCategory, sizes, bestSeller } = req.body

  const files = req.files as Record<string, Express.Multer.File[]> | undefined
  const images = [files?.image1?.[0], files?.image2?.[0], files?.image3?.[0], files?.image4?.[0]].filter(
    (item): item is Express.Multer.File => item !== undefined
  )
  if (images.length === 0) throw new AppError('At least one image is required', 400)

  const imagesUrl = await Promise.all(
    images.map(async (item) => {
      const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
      return result.secure_url
    })
  )

  const product = new productModel({
    name,
    description,
    category,
    price: Number(price),
    subCategory,
    bestSeller: bestSeller === 'true',
    sizes: JSON.parse(sizes),
    image: imagesUrl,
    date: Date.now(),
  })
  await product.save()

  res.json({ success: true, message: 'product added' })
})

export const listProduct = asyncHandler(async (req, res) => {
  const products = await productModel.find({})
  res.json({ success: true, products })
})

export const removeProduct = asyncHandler(async (req, res) => {
  await productModel.findByIdAndDelete(req.body.id)
  res.json({ success: true, message: 'product deleted' })
})

export const singleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body
  const product = await productModel.findById(productId)
  if (!product) throw new AppError('Product not found', 404)
  res.json({ success: true, product })
})
