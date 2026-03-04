import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import toast from 'react-hot-toast'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent successfully!')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'support@clinicpro.ai' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Address', value: '123 Medical Drive, Health City' },
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-3 sm:mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto px-2">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-10 sm:mb-14 lg:mb-16">
          {contactInfo.map((c) => (
            <div key={c.label} className="card text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <c.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">{c.label}</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-slate-100 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                  <input className="input-field" placeholder="Your name" value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input className="input-field" type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                <input className="input-field" placeholder="Subject" value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                <textarea className="input-field min-h-[120px] sm:min-h-[150px] resize-y" placeholder="Your message..."
                  value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact