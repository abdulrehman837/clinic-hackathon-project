import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'
import cloudinary from '../config/cloudinary.js'
import fs from 'fs'

const router = express.Router()

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hackathon',
    })
    // Remove local file after upload
    fs.unlinkSync(req.file.path)
    res.json({ url: result.secure_url, public_id: result.public_id })
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message })
  }
})

export default router