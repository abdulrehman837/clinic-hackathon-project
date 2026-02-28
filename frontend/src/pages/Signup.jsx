import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSignupMutation } from '../store/api/authApi.js'
import { setCredentials } from '../store/slices/authSlice.js'
import { Activity, User, Mail, Lock, ArrowRight, Stethoscope, UserRound, ClipboardList } from 'lucide-react'
import toast from 'react-hot-toast'

const roles = [
  { value: 'patient', label: 'Patient', icon: UserRound, desc: 'Book appointments' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, desc: 'Manage patients' },
  { value: 'receptionist', label: 'Receptionist', icon: ClipboardList, desc: 'Front desk' },
]

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' })
  const [signup, { isLoading }] = useSignupMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await signup(form).unwrap()
      dispatch(setCredentials(res))
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) { toast.error(err?.data?.message || 'Signup failed') }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-[920px] grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 bg-white">
        {/* LEFT — Image */}
        <div className="hidden lg:block relative min-h-[620px]">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&h=900&fit=crop&q=80" 
            alt="Doctor" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/50 to-violet-900/20" />
          <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
            <div className="flex items-center gap-2 text-white/90 font-bold text-lg">
              <Activity size={22} /> MedAI Clinic
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-3">Join Us Today</h2>
              <p className="text-violet-100 leading-relaxed max-w-[280px]">
                Experience AI-powered healthcare management platform.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="p-10 lg:p-12 flex flex-col justify-center">
          <h1 className="text-2xl font-black text-slate-900 mb-1">Create Account</h1>
          <p className="text-slate-400 text-sm mb-6">Choose your role and get started</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type="text" placeholder="Full Name" className="input-field pl-11" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type="email" placeholder="Email" className="input-field pl-11" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type="password" placeholder="Password" className="input-field pl-11" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Select your role</p>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(r => (
                  <button key={r.value} type="button" onClick={() => setForm({...form, role: r.value})}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${form.role === r.value ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <r.icon className={`w-5 h-5 ${form.role === r.value ? 'text-blue-600' : 'text-slate-400'}`} />
                    <p className={`text-xs font-bold ${form.role === r.value ? 'text-blue-700' : 'text-slate-500'}`}>{r.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? 'Creating...' : <><span>Create Account</span><ArrowRight size={18}/></>}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
