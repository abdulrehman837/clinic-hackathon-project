import { useState } from 'react'
import toast from 'react-hot-toast'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent successfully!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-primary">Contact Us</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="input-field"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input-field"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Message"
          className="input-field h-32 resize-none"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <button type="submit" className="btn-primary w-full">Send Message</button>
      </form>
    </div>
  )
}

export default Contact