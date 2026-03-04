import { useState } from 'react'
import { useGetAppointmentsQuery, useCreateAppointmentMutation, useCancelAppointmentMutation } from '../store/api/appointmentApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { Calendar, Plus, X, Clock, User, Search, Filter } from 'lucide-react'
import toast from 'react-hot-toast'

const Appointments = () => {
  const { data, isLoading } = useGetAppointmentsQuery()
  const { data: patientsData } = useGetPatientsQuery()
  const [createAppointment, { isLoading: creating }] = useCreateAppointmentMutation()
  const [cancelAppointment] = useCancelAppointmentMutation()
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ patient: '', date: '', time: '', reason: '', notes: '' })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const appointments = (data?.data || data || []).filter(a => {
    const matchSearch = (a.patientName || a.patient?.name || '').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || a.status === filter
    return matchSearch && matchFilter
  })

  const patients = patientsData?.data || patientsData || []

  const statusColors = {
    scheduled: 'bg-blue-50 text-blue-700',
    completed: 'bg-emerald-50 text-emerald-700',
    cancelled: 'bg-red-50 text-red-700',
    pending: 'bg-amber-50 text-amber-700',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createAppointment(form).unwrap()
      toast.success('Appointment created!')
      setModal(false)
      setForm({ patient: '', date: '', time: '', reason: '', notes: '' })
    } catch { toast.error('Failed') }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    try { await cancelAppointment(id).unwrap(); toast.success('Cancelled!') } catch { toast.error('Failed') }
  }

  const stats = [
    { label: 'Total', value: (data?.data || data || []).length, color: 'text-blue-600 bg-blue-50' },
    { label: 'Scheduled', value: (data?.data || data || []).filter(a => a.status === 'scheduled').length, color: 'text-violet-600 bg-violet-50' },
    { label: 'Completed', value: (data?.data || data || []).filter(a => a.status === 'completed').length, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Cancelled', value: (data?.data || data || []).filter(a => a.status === 'cancelled').length, color: 'text-red-600 bg-red-50' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Appointments</h1>
            <p className="text-xs sm:text-sm text-slate-500">Manage all appointments</p>
          </div>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> New Appointment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map(s => (
          <div key={s.label} className="stat-card flex items-center gap-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${s.color} shrink-0`}>
              <span className="text-base sm:text-lg font-black">{s.value}</span>
            </div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        <div className="relative flex-1 max-w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input className="input-field pl-10 py-2.5 text-sm" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5 overflow-x-auto scroll-x-mobile pb-1">
          {['all', 'scheduled', 'completed', 'cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition-all ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-16 sm:py-20 text-slate-400">Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-16 sm:py-20 px-4">
          <Calendar className="w-14 h-14 sm:w-16 sm:h-16 text-slate-200 mx-auto mb-3 sm:mb-4" />
          <p className="text-slate-500 text-sm sm:text-base">No appointments found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {appointments.map(a => (
            <div key={a._id} className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                    {(a.patientName || a.patient?.name || 'P')[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">{a.patientName || a.patient?.name}</h3>
                    <p className="text-xs text-slate-400 truncate">{a.reason || 'General'}</p>
                  </div>
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full capitalize shrink-0 ${statusColors[a.status] || 'bg-slate-100 text-slate-600'}`}>
                  {a.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(a.date).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {a.time}</span>
              </div>
              {a.status === 'scheduled' && (
                <button onClick={() => handleCancel(a._id)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium hover:bg-red-50 px-2 py-1 rounded transition-all">
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setModal(false)}>
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 z-10">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">New Appointment</h2>
              <button onClick={() => setModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Patient *</label>
                <select className="input-field" value={form.patient} onChange={e => setForm({...form, patient: e.target.value})} required>
                  <option value="">Select Patient</option>
                  {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Date *</label>
                  <input className="input-field" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Time *</label>
                  <input className="input-field" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason</label>
                <input className="input-field" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea className="input-field min-h-[80px] resize-y" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 safe-bottom">
                <button type="button" onClick={() => setModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                  {creating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments