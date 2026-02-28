import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetUsersQuery } from '../store/api/usersApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { useGetAppointmentsQuery } from '../store/api/appointmentApi'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, UserCog, CalendarDays, Activity, TrendingUp, Pill, Bot } from 'lucide-react'

const chart = [{ d:'Mon',v:42 },{ d:'Tue',v:58 },{ d:'Wed',v:45 },{ d:'Thu',v:72 },{ d:'Fri',v:65 },{ d:'Sat',v:38 },{ d:'Sun',v:22 }]

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { data: docData } = useGetUsersQuery('doctor')
  const { data: recData } = useGetUsersQuery('receptionist')
  const { data: patData } = useGetPatientsQuery()
  const { data: aptData } = useGetAppointmentsQuery()

  const docs = docData?.data || docData || []
  const recs = recData?.data || recData || []
  const pats = patData?.data || patData || []
  const apts = aptData?.data || aptData || []

  const stats = [
    { label: 'Doctors', value: docs.length, icon: UserCog, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', clr: 'text-blue-600' },
    { label: 'Patients', value: pats.length, icon: Users, gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', clr: 'text-emerald-600' },
    { label: 'Appointments', value: apts.length, icon: CalendarDays, gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-50', clr: 'text-violet-600' },
    { label: 'Receptionists', value: recs.length, icon: Activity, gradient: 'from-amber-500 to-orange-600', bg: 'bg-amber-50', clr: 'text-amber-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium">Admin Panel</p>
          <h1 className="text-2xl font-black text-white mt-1">Welcome back, {user?.name}</h1>
          <p className="text-blue-200 text-sm mt-1">System overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center`}><s.icon className={`w-5 h-5 ${s.clr}`}/></div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Appointments Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chart}>
              <defs><linearGradient id="ac" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/><stop offset="95%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} />
              <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e2e8f0', boxShadow:'0 4px 12px rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={2.5} fill="url(#ac)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { label: 'Manage Users', to: '/manage-users', icon: UserCog, clr: 'text-blue-600 bg-blue-50' },
              { label: 'View Patients', to: '/patients', icon: Users, clr: 'text-emerald-600 bg-emerald-50' },
              { label: 'Appointments', to: '/appointments', icon: CalendarDays, clr: 'text-violet-600 bg-violet-50' },
              { label: 'Prescriptions', to: '/prescriptions', icon: Pill, clr: 'text-amber-600 bg-amber-50' },
            ].map((a, i) => (
              <Link key={i} to={a.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.clr}`}><a.icon size={18}/></div>
                <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
