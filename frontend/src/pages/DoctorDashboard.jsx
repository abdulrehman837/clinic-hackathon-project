import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAppointmentsQuery } from '../store/api/appointmentApi'
import { useGetPrescriptionsQuery } from '../store/api/prescriptionApi'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { CalendarDays, Pill, Bot, Users, TrendingUp, Clock } from 'lucide-react'

const chart = [{ d:'Mon',v:8 },{ d:'Tue',v:12 },{ d:'Wed',v:6 },{ d:'Thu',v:15 },{ d:'Fri',v:10 },{ d:'Sat',v:4 },{ d:'Sun',v:2 }]

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { data: aptData } = useGetAppointmentsQuery()
  const { data: rxData } = useGetPrescriptionsQuery()

  const apts = aptData?.data || aptData || []
  const rxs = rxData?.data || rxData || []
  const today = apts.filter(a => a.status !== 'cancelled')

  const stats = [
    { label: "Today's Appointments", value: today.length, icon: CalendarDays, bg: 'bg-blue-50', clr: 'text-blue-600' },
    { label: 'Prescriptions Written', value: rxs.length, icon: Pill, bg: 'bg-violet-50', clr: 'text-violet-600' },
    { label: 'AI Consultations', value: '—', icon: Bot, bg: 'bg-rose-50', clr: 'text-rose-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <p className="text-emerald-100 text-sm">Doctor Dashboard</p>
          <h1 className="text-2xl font-black text-white mt-1">Dr. {user?.name}</h1>
          <p className="text-emerald-200 text-sm mt-1">Your patients and schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
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
          <h3 className="font-bold text-slate-800 mb-4">Weekly Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chart}>
              <defs><linearGradient id="dc" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.15}/><stop offset="95%" stopColor="#059669" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill:'#94a3b8', fontSize:12 }} />
              <Tooltip contentStyle={{ borderRadius:12, border:'1px solid #e2e8f0' }} />
              <Area type="monotone" dataKey="v" stroke="#059669" strokeWidth={2.5} fill="url(#dc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/patients" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all"><div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Users size={18} className="text-blue-600"/></div><span className="font-semibold text-sm text-slate-700">My Patients</span></Link>
            <Link to="/appointments" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all"><div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><Clock size={18} className="text-emerald-600"/></div><span className="font-semibold text-sm text-slate-700">Appointments</span></Link>
            <Link to="/prescriptions" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all"><div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center"><Pill size={18} className="text-violet-600"/></div><span className="font-semibold text-sm text-slate-700">Prescriptions</span></Link>
            <Link to="/ai-tools" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all"><div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center"><Bot size={18} className="text-rose-600"/></div><span className="font-semibold text-sm text-slate-700">AI Tools</span></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
