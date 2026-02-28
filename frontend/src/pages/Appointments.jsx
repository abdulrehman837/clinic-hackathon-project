import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetAppointmentsQuery, useCreateAppointmentMutation, useCancelAppointmentMutation } from '../store/api/appointmentApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { CalendarDays, Plus, X, Ban } from 'lucide-react'
import toast from 'react-hot-toast'

const statusStyles = {
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
}

const Appointments = () => {
  const { user } = useSelector((state) => state.auth)
  const { data, isLoading } = useGetAppointmentsQuery()
  const { data: patientData } = useGetPatientsQuery()
  const [createAppointment] = useCreateAppointmentMutation()
  const [cancelAppointment] = useCancelAppointmentMutation()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ patient: '', date: '', time: '', type: 'consultation', reason: '' })

  const appointments = data?.data || data || []
  const patients = patientData?.data || patientData || []

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createAppointment(form).unwrap()
      toast.success('Appointment booked!')
      setForm({ patient: '', date: '', time: '', type: 'consultation', reason: '' })
      setShowForm(false)
    } catch (err) { toast.error(err?.data?.message || 'Failed') }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    try { await cancelAppointment(id).unwrap(); toast.success('Cancelled!') } catch { toast.error('Failed') }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center"><CalendarDays className="w-6 h-6 text-emerald-600" /></div>
          <div><h1 className="text-2xl font-black text-slate-900">Appointments</h1><p className="text-sm text-slate-500">{appointments.length} total</p></div>
        </div>
        {['admin','receptionist','patient'].includes(user?.role) && (
          <button onClick={() => setShowForm(!showForm)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${showForm ? 'bg-slate-100 text-slate-600' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'}`}>
            {showForm ? <><X size={16}/> Cancel</> : <><Plus size={16}/> Book Appointment</>}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Book New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="input-field" value={form.patient} onChange={e => setForm({...form, patient: e.target.value})} required>
              <option value="">Select Patient *</option>
              {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            <select className="input-field" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
              <option value="consultation">Consultation</option><option value="follow-up">Follow-up</option>
              <option value="emergency">Emergency</option><option value="checkup">Checkup</option>
            </select>
            <input className="input-field" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
            <input className="input-field" type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required />
            <input className="input-field md:col-span-2" placeholder="Reason for visit" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} />
          </div>
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-7 rounded-xl transition-all shadow-lg mt-6">Book Appointment</button>
        </form>
      )}

      {isLoading ? <p className="text-slate-500 text-center py-20">Loading...</p> : appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-20">
          <CalendarDays className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No appointments found</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {appointments.map((a) => (
            <div key={a._id} className="bg-white rounded-xl p-5 border border-slate-100 flex justify-between items-center hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                  {(a.patient?.name || 'P').charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{a.patient?.name || 'Patient'} — <span className="text-blue-600 capitalize">{a.type}</span></h3>
                  <p className="text-slate-500 text-sm">{a.date && new Date(a.date).toLocaleDateString()} at {a.time} {a.reason && `· ${a.reason}`}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusStyles[a.status] || statusStyles.pending}`}>
                  {a.status || 'scheduled'}
                </span>
                {a.status !== 'cancelled' && (
                  <button onClick={() => handleCancel(a._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Ban size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Appointments
