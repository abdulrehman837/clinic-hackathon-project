import { useState } from 'react'
import { useGetPrescriptionsQuery, useCreatePrescriptionMutation } from '../store/api/prescriptionApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { FileText, Plus, X, Pill, Calendar, User, Search, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

const Prescriptions = () => {
  const { data, isLoading } = useGetPrescriptionsQuery()
  const { data: patientsData } = useGetPatientsQuery()
  const [createPrescription, { isLoading: creating }] = useCreatePrescriptionMutation()
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ patient: '', diagnosis: '', notes: '', medications: [{ name: '', dosage: '', frequency: '', duration: '' }] })

  const prescriptions = (data?.data || data || []).filter(p =>
    (p.patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.diagnosis || '').toLowerCase().includes(search.toLowerCase())
  )
  const patients = patientsData?.data || patientsData || []

  const addMed = () => setForm({ ...form, medications: [...form.medications, { name: '', dosage: '', frequency: '', duration: '' }] })
  const removeMed = (i) => setForm({ ...form, medications: form.medications.filter((_, idx) => idx !== i) })
  const updateMed = (i, field, val) => {
    const meds = [...form.medications]; meds[i][field] = val; setForm({ ...form, medications: meds })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPrescription(form).unwrap()
      toast.success('Prescription created!')
      setModal(false)
      setForm({ patient: '', diagnosis: '', notes: '', medications: [{ name: '', dosage: '', frequency: '', duration: '' }] })
    } catch { toast.error('Failed') }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Prescriptions</h1>
            <p className="text-xs sm:text-sm text-slate-500">{prescriptions.length} total</p>
          </div>
        </div>
        <button onClick={() => setModal(true)} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> New Prescription
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 sm:mb-6 max-w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input className="input-field pl-10 py-2.5 text-sm" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-16 sm:py-20 text-slate-400">Loading...</div>
      ) : prescriptions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-16 sm:py-20 px-4">
          <FileText className="w-14 h-14 sm:w-16 sm:h-16 text-slate-200 mx-auto mb-3 sm:mb-4" />
          <p className="text-slate-500 text-sm sm:text-base">No prescriptions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {prescriptions.map(p => (
            <div key={p._id} className="bg-white rounded-xl p-4 sm:p-5 border border-slate-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                  {(p.patient?.name || 'P')[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800 text-sm truncate">{p.patient?.name || 'Patient'}</h3>
                  <p className="text-xs text-slate-400">{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mb-3">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{p.diagnosis || 'N/A'}</span>
              </div>
              {p.medications?.length > 0 && (
                <div className="space-y-1.5">
                  {p.medications.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <Pill size={12} className="text-emerald-400 shrink-0" />
                      <span className="truncate">{m.name} - {m.dosage}</span>
                    </div>
                  ))}
                  {p.medications.length > 3 && (
                    <p className="text-[11px] text-slate-400">+{p.medications.length - 3} more</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setModal(false)}>
          <div className="bg-white w-full sm:max-w-lg md:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 z-10">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">New Prescription</h2>
              <button onClick={() => setModal(false)} className="p-2 hover:bg-slate-100 rounded-lg"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Patient *</label>
                  <select className="input-field" value={form.patient} onChange={e => setForm({...form, patient: e.target.value})} required>
                    <option value="">Select Patient</option>
                    {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Diagnosis *</label>
                  <input className="input-field" value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})} required />
                </div>
              </div>

              {/* Medications */}
              <div>
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <label className="text-sm font-medium text-slate-700">Medications</label>
                  <button type="button" onClick={addMed} className="text-xs text-blue-600 font-semibold hover:bg-blue-50 px-2 py-1 rounded transition-all">+ Add</button>
                </div>
                <div className="space-y-3">
                  {form.medications.map((m, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                        <input className="input-field text-sm col-span-2 sm:col-span-1" placeholder="Medicine" value={m.name} onChange={e => updateMed(i, 'name', e.target.value)} />
                        <input className="input-field text-sm" placeholder="Dosage" value={m.dosage} onChange={e => updateMed(i, 'dosage', e.target.value)} />
                        <input className="input-field text-sm" placeholder="Frequency" value={m.frequency} onChange={e => updateMed(i, 'frequency', e.target.value)} />
                        <div className="flex gap-2 col-span-2 sm:col-span-1">
                          <input className="input-field text-sm flex-1" placeholder="Duration" value={m.duration} onChange={e => updateMed(i, 'duration', e.target.value)} />
                          {form.medications.length > 1 && (
                            <button type="button" onClick={() => removeMed(i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Notes</label>
                <textarea className="input-field min-h-[70px] sm:min-h-[80px] resize-y" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 safe-bottom">
                <button type="button" onClick={() => setModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                  {creating ? 'Creating...' : 'Create Prescription'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Prescriptions