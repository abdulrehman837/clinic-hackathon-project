import { useState } from 'react'
import { useGetPatientsQuery, useCreatePatientMutation, useUpdatePatientMutation, useDeletePatientMutation } from '../store/api/patientApi'
import { Users, Plus, Search, Edit3, Trash2, X, Phone, Mail, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

const emptyForm = { name: '', age: '', gender: 'male', phone: '', email: '', address: '', bloodGroup: '', medicalHistory: '' }

const Patients = () => {
  const { data, isLoading } = useGetPatientsQuery()
  const [createPatient, { isLoading: creating }] = useCreatePatientMutation()
  const [updatePatient, { isLoading: updating }] = useUpdatePatientMutation()
  const [deletePatient] = useDeletePatientMutation()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [search, setSearch] = useState('')

  const patients = (data?.data || data || []).filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  )

  const openAdd = () => { setForm(emptyForm); setEditing(null); setModal(true) }
  const openEdit = (p) => { setForm({ name: p.name, age: p.age, gender: p.gender, phone: p.phone || '', email: p.email || '', address: p.address || '', bloodGroup: p.bloodGroup || '', medicalHistory: p.medicalHistory || '' }); setEditing(p._id); setModal(true) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) { await updatePatient({ id: editing, ...form }).unwrap(); toast.success('Updated!') }
      else { await createPatient(form).unwrap(); toast.success('Patient added!') }
      setModal(false)
    } catch { toast.error('Failed') }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return
    try { await deletePatient(id).unwrap(); toast.success('Deleted!') } catch { toast.error('Failed') }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Patients</h1>
            <p className="text-xs sm:text-sm text-slate-500">{patients.length} total patients</p>
          </div>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> Add Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 sm:mb-6 max-w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input className="input-field pl-10 py-2.5 text-sm" placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-16 sm:py-20 text-slate-400">Loading...</div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-16 sm:py-20 px-4">
          <Users className="w-14 h-14 sm:w-16 sm:h-16 text-slate-200 mx-auto mb-3 sm:mb-4" />
          <p className="text-slate-500 text-sm sm:text-base">No patients found</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Patient</th>
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Age/Gender</th>
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Contact</th>
                    <th className="text-left px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Blood</th>
                    <th className="text-right px-4 lg:px-6 py-3 lg:py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((p) => (
                    <tr key={p._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {p.name?.[0]?.toUpperCase()}
                          </div>
                          <span className="font-medium text-slate-800 text-sm">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-600">{p.age} / <span className="capitalize">{p.gender}</span></td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-sm text-slate-500">{p.phone || p.email || '-'}</td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4">
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-50 text-red-700">{p.bloodGroup || '-'}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 lg:py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={15} /></button>
                          <button onClick={() => handleDelete(p._id, p.name)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {patients.map((p) => (
              <div key={p._id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {p.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">{p.name}</h3>
                      <p className="text-xs text-slate-400">{p.age}y • <span className="capitalize">{p.gender}</span></p>
                    </div>
                  </div>
                  {p.bloodGroup && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700">{p.bloodGroup}</span>
                  )}
                </div>
                <div className="space-y-1.5 mb-3">
                  {p.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={12} /> {p.phone}
                    </div>
                  )}
                  {p.email && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 truncate">
                      <Mail size={12} /> {p.email}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-1 border-t border-slate-50 pt-2.5">
                  <button onClick={() => openEdit(p)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95">
                    <Edit3 size={15} />
                  </button>
                  <button onClick={() => handleDelete(p._id, p.name)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-95">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4"
          onClick={() => setModal(false)}>
          <div className="bg-white w-full sm:max-w-lg md:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 z-10">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{editing ? 'Edit Patient' : 'Add Patient'}</h2>
              <button onClick={() => setModal(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name *</label>
                  <input className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Age *</label>
                  <input className="input-field" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Gender</label>
                  <select className="input-field" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Blood Group</label>
                  <input className="input-field" placeholder="A+" value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                  <input className="input-field" placeholder="+1234567890" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input className="input-field" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                <input className="input-field" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Medical History</label>
                <textarea className="input-field min-h-[80px] sm:min-h-[100px] resize-y" value={form.medicalHistory} onChange={e => setForm({...form, medicalHistory: e.target.value})} />
              </div>
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2 safe-bottom">
                <button type="button" onClick={() => setModal(false)} className="btn-secondary w-full sm:w-auto">Cancel</button>
                <button type="submit" disabled={creating || updating} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                  {creating || updating ? 'Saving...' : editing ? 'Update' : 'Add Patient'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Patients