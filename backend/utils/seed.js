const User = require('../src/models/User')

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ role: 'admin' })
    if (!exists) {
      await User.create({ name: 'System Admin', email: 'admin@medai.com', password: 'admin123', role: 'admin' })
      console.log('✅ Admin seeded → admin@medai.com / admin123')
    } else {
      console.log('✅ Admin already exists')
    }
  } catch (err) {
    console.log('Seed error:', err.message)
  }
}

module.exports = seedAdmin
