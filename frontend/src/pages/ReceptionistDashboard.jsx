import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAppointmentsQuery } from '../store/api/appointmentApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { CalendarDays, UserPlus, Users, ClipboardList, TrendingUp } from 'lucide-react'

const ReceptionistDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { data: aptData } = useGetAppointmentsQuery()
  const { data: patData } = useGetPatientsQuery()
  const apts = aptData?.data || aptData || []
  const pats = patData?.data || patData || []

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <p className="text-amber-100 text-sm">Reception Desk</p>
          <h1 className="text-2xl font-black text-white mt-1">Hello, {user?.name}</h1>
          <p className="text-amber-200 text-sm mt-1">Manage patients and schedule</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="stat-card"><div className="flex items-center justify-between mb-4"><div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center"><CalendarDays className="w-5 h-5 text-blue-600"/></div><TrendingUp className="w-4 h-4 text-green-500"/></div><p className="text-2xl font-black text-slate-900">{apts.length}</p><p className="text-sm text-slate-500">Appointments</p></div>
        <div className="stat-card"><div className="flex items-center justify-between mb-4"><div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-emerald-600"/></div><TrendingUp className="w-4 h-4 text-green-500"/></div><p className="text-2xl font-black text-slate-900">{pats.length}</p><p className="text-sm text-slate-500">Patients</p></div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/patients" className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><UserPlus size={18} className="text-blue-600"/></div>
            <div><p className="font-bold text-sm text-slate-800">Register Patient</p><p className="text-xs text-slate-400">Add new patient</p></div>
          </Link>
          <Link to="/appointments" className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><ClipboardList size={18} className="text-emerald-600"/></div>
            <div><p className="font-bold text-sm text-slate-800">Book Appointment</p><p className="text-xs text-slate-400">Schedule visit</p></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ReceptionistDashboard
