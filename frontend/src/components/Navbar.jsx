import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { Activity, LayoutDashboard, Users, CalendarDays, Pill, Bot, LogOut, UserCog } from 'lucide-react'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const r = user?.role

  const handleLogout = () => { dispatch(logout()); toast.success('Logged out!'); navigate('/') }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-lg text-slate-800">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span>Med<span className="text-blue-600">AI</span></span>
        </Link>
        <div className="flex items-center gap-1">
          {user ? (
            <>
              <NL to="/dashboard" icon={<LayoutDashboard size={16}/>} label="Dashboard" />
              {r === 'admin' && <NL to="/manage-users" icon={<UserCog size={16}/>} label="Users" />}
              {['admin','doctor','receptionist'].includes(r) && <NL to="/patients" icon={<Users size={16}/>} label="Patients" />}
              <NL to="/appointments" icon={<CalendarDays size={16}/>} label="Appointments" />
              {['admin','doctor','patient'].includes(r) && <NL to="/prescriptions" icon={<Pill size={16}/>} label="Prescriptions" />}
              {r === 'doctor' && <NL to="/ai-tools" icon={<Bot size={16}/>} label="AI Tools" />}
              <div className="w-px h-8 bg-slate-200 mx-3" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold">{user.name?.[0]?.toUpperCase()}</div>
                <div className="hidden md:block leading-tight">
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-[11px] text-slate-400 capitalize">{r}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><LogOut size={18}/></button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium text-sm transition-all">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all shadow-md">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const NL = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg font-medium text-sm transition-all">
    {icon}<span className="hidden lg:inline">{label}</span>
  </Link>
)

export default Navbar
