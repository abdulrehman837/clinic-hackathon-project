import asyncHandler from 'express-async-handler'
import Item from '../models/Item.js'

// GET /api/items — user sees only their items (RBAC)
export const getItems = asyncHandler(async (req, res) => {
  const items = req.user.role === 'admin'
    ? await Item.find().populate('user', 'name email')
    : await Item.find({ user: req.user._id })
  res.json(items)
})

// GET /api/items/:id
export const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }
  // RBAC: user can only access own data
  if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403)
    throw new Error('Not authorized')
  }
  res.json(item)
})

// POST /api/items
export const createItem = asyncHandler(async (req, res) => {
  const { title, description, image } = req.body
  const item = await Item.create({
    title,
    description,
    image: image || '',
    user: req.user._id,
  })
  res.status(201).json(item)
})

// PUT /api/items/:id
export const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }
  if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403)
    throw new Error('Not authorized')
  }
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(updated)
})

// DELETE /api/items/:id
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }
  if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403)
    throw new Error('Not authorized')
  }
  await Item.findByIdAndDelete(req.params.id)
  res.json({ message: 'Item deleted' })
})