import express from 'express'
import { getItems, getItemById, createItem, updateItem, deleteItem } from '../controllers/crudController.js'
import { protect } from '../middleware/authMiddleware.js'
import { authorize } from '../middleware/roleMiddleware.js'

const router = express.Router()

router.route('/')
  .get(protect, getItems)
  .post(protect, createItem)

router.route('/:id')
  .get(protect, getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem)

// Admin only route example
router.get('/admin/all', protect, authorize('admin'), async (req, res) => {
  const Item = (await import('../models/Item.js')).default
  const items = await Item.find().populate('user', 'name email')
  res.json(items)
})

export default router