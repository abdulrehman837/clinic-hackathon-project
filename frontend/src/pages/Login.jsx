import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../store/api/authApi.js'
import { setCredentials } from '../store/slices/authSlice.js'
import { Activity, Mail, Lock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login(form).unwrap()
      dispatch(setCredentials(res))
      toast.success('Login successful!')
      navigate('/dashboard')
    } catch (err) { toast.error(err?.data?.message || 'Login failed') }
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="w-full max-w-[920px] grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100 bg-white">
        {/* LEFT — Image */}
        <div className="hidden lg:block relative min-h-[560px]">
          <img 
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&h=800&fit=crop&q=80" 
            alt="Hospital" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-blue-900/20" />
          <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
            <div className="flex items-center gap-2 text-white/90 font-bold text-lg">
              <Activity size={22} /> MedAI Clinic
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-3">Welcome Back!</h2>
              <p className="text-blue-100 leading-relaxed max-w-[280px]">
                Access your clinic dashboard and manage everything in one place.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — Form */}
        <div className="p-10 lg:p-12 flex flex-col justify-center">
          <h1 className="text-2xl font-black text-slate-900 mb-1">Sign In</h1>
          <p className="text-slate-400 text-sm mb-8">Enter your credentials to continue</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type="email" placeholder="Email address" className="input-field pl-11" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
              <input type="password" placeholder="Password" className="input-field pl-11" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? 'Signing in...' : <><span>Sign In</span><ArrowRight size={18}/></>}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
