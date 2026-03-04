import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../store/slices/authSlice'
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Stethoscope, ClipboardList, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'doctor' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const roles = [
    { key: 'doctor', label: 'Doctor', icon: Stethoscope, desc: 'Medical practitioner' },
    { key: 'receptionist', label: 'Receptionist', icon: ClipboardList, desc: 'Front desk staff' },
    { key: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'System administrator' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      dispatch(setCredentials({ user: data.user, token: data.token }))
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) { toast.error(err.message || 'Signup failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base">Join ClinicPro today</p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 sm:mb-3">Select Role</label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {roles.map(r => (
                  <button key={r.key} type="button" onClick={() => setForm({...form, role: r.key})}
                    className={`p-2.5 sm:p-4 rounded-xl border-2 transition-all text-center ${
                      form.role === r.key
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-100 hover:border-slate-200 text-slate-500'
                    }`}>
                    <r.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
                    <span className="text-xs sm:text-sm font-semibold block">{r.label}</span>
                    <span className="text-[10px] sm:text-xs opacity-70 hidden xs:block">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input className="input-field pl-10 sm:pl-11" placeholder="Dr. John Doe"
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input className="input-field pl-10 sm:pl-11" type="email" placeholder="your@email.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input className="input-field pl-10 sm:pl-11 pr-11" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-xs sm:text-sm text-slate-500 mt-5 sm:mt-6">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup