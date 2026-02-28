import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetAppointmentsQuery } from '../store/api/appointmentApi'
import { useGetPrescriptionsQuery } from '../store/api/prescriptionApi'
import { CalendarDays, Pill, User, TrendingUp, Download } from 'lucide-react'

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { data: aptData } = useGetAppointmentsQuery()
  const { data: rxData } = useGetPrescriptionsQuery()
  const apts = aptData?.data || aptData || []
  const rxs = rxData?.data || rxData || []

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="bg-gradient-to-r from-blue-600 to-violet-700 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-blue-100 text-sm">Patient Portal</p>
            <h1 className="text-2xl font-black text-white">{user?.name}</h1>
            <p className="text-blue-200 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center"><CalendarDays className="w-5 h-5 text-blue-600" /></div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{apts.length}</p>
          <p className="text-sm text-slate-500 mt-0.5">My Appointments</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 bg-violet-50 rounded-xl flex items-center justify-center"><Pill className="w-5 h-5 text-violet-600" /></div>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{rxs.length}</p>
          <p className="text-sm text-slate-500 mt-0.5">Prescriptions</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Recent Appointments</h3>
            <Link to="/appointments" className="text-sm text-blue-600 font-semibold hover:underline">View All</Link>
          </div>
          {apts.length === 0 ? (
            <div className="text-center py-10">
              <CalendarDays className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No appointments yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {apts.slice(0, 5).map(a => (
                <div key={a._id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-800 capitalize">{a.type || 'Consultation'}</p>
                      <p className="text-xs text-slate-400">{a.date && new Date(a.date).toLocaleDateString()} {a.time && `at ${a.time}`}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    a.status === 'completed' ? 'bg-green-50 text-green-700' : 
                    a.status === 'cancelled' ? 'bg-red-50 text-red-700' : 
                    'bg-blue-50 text-blue-700'
                  }`}>{a.status || 'scheduled'}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Prescriptions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">My Prescriptions</h3>
            <Link to="/prescriptions" className="text-sm text-blue-600 font-semibold hover:underline">View All</Link>
          </div>
          {rxs.length === 0 ? (
            <div className="text-center py-10">
              <Pill className="w-12 h-12 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No prescriptions yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {rxs.slice(0, 5).map(r => (
                <div key={r._id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                      <Pill className="w-4 h-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{r.diagnosis || 'Prescription'}</p>
                      <p className="text-xs text-slate-400">{r.medications?.length || 0} medications · {new Date(r.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <button onClick={() => {
                    const token = localStorage.getItem('token')
                    fetch(`/api/prescriptions/${r._id}/pdf`, { headers: { Authorization: `Bearer ${token}` } })
                      .then(res => res.blob()).then(b => window.open(URL.createObjectURL(b)))
                  }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
