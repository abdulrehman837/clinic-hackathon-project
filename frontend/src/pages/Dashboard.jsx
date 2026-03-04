import { useSelector } from 'react-redux'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { useGetAppointmentsQuery } from '../store/api/appointmentApi'
import { useGetPrescriptionsQuery } from '../store/api/prescriptionApi'
import { usePredictiveAnalyticsQuery } from '../store/api/aiApi'
import {
  Users, Calendar, FileText, Activity, TrendingUp, Clock,
  CheckCircle, AlertCircle, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { data: patients } = useGetPatientsQuery()
  const { data: appointments } = useGetAppointmentsQuery()
  const { data: prescriptions } = useGetPrescriptionsQuery()
  const { data: analytics } = usePredictiveAnalyticsQuery()

  const patientList = patients?.data || patients || []
  const appointmentList = appointments?.data || appointments || []
  const prescriptionList = prescriptions?.data || prescriptions || []

  const todayAppointments = appointmentList.filter(a => {
    const today = new Date().toDateString()
    return new Date(a.date).toDateString() === today
  })

  const stats = [
    { label: 'Total Patients', value: patientList.length, icon: Users, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'Appointments', value: appointmentList.length, icon: Calendar, color: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', text: 'text-violet-600' },
    { label: 'Today\'s Visits', value: todayAppointments.length, icon: Clock, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { label: 'Prescriptions', value: prescriptionList.length, icon: FileText, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50', text: 'text-orange-600' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white mb-6 sm:mb-8 relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <p className="text-blue-100 text-xs sm:text-sm mb-1">Welcome back,</p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black mb-1 sm:mb-2">{user?.name || 'User'} 👋</h1>
          <p className="text-blue-200 text-xs sm:text-sm capitalize">{user?.role} Dashboard</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 ${s.bg} rounded-xl sm:rounded-2xl flex items-center justify-center`}>
                <s.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${s.text}`} />
              </div>
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">{s.value}</div>
            <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 truncate">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Grid - Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Recent Appointments</h2>
            <Link to="/appointments" className="text-xs sm:text-sm text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
            {appointmentList.length === 0 ? (
              <p className="text-slate-400 text-sm py-6 sm:py-8 text-center">No appointments yet</p>
            ) : (
              appointmentList.slice(0, 5).map((a) => (
                <div key={a._id} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{a.patientName || a.patient?.name || 'Patient'}</p>
                    <p className="text-[11px] sm:text-xs text-slate-400 truncate">{new Date(a.date).toLocaleDateString()} • {a.time}</p>
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 ${
                    a.status === 'completed' ? 'bg-emerald-50 text-emerald-700'
                    : a.status === 'cancelled' ? 'bg-red-50 text-red-700'
                    : 'bg-blue-50 text-blue-700'
                  }`}>{a.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Recent Patients</h2>
            <Link to="/patients" className="text-xs sm:text-sm text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-2 sm:space-y-3">
            {patientList.length === 0 ? (
              <p className="text-slate-400 text-sm py-6 sm:py-8 text-center">No patients yet</p>
            ) : (
              patientList.slice(0, 5).map((p) => (
                <div key={p._id} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                    {p.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{p.name}</p>
                    <p className="text-[11px] sm:text-xs text-slate-400 truncate">{p.email || p.phone || 'No contact'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard