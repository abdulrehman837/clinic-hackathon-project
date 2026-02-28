cat > backend/controllers/userController.js << 'EOF'
import User from '../models/User.js'

export const getUsers = async (req, res) => {
  try {
    const filter = req.query.role ? { role: req.query.role } : {}
    const users = await User.find(filter).select('-password').sort('-createdAt')
    res.json({ success: true, data: users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    if (user.role === 'admin') return res.status(400).json({ success: false, message: 'Cannot delete admin' })
    await user.deleteOne()
    res.json({ success: true, message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
EOF