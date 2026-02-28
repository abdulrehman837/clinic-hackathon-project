import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetPatientsQuery, useCreatePatientMutation, useDeletePatientMutation } from '../store/api/patientApi'
import { Users, Plus, X, Trash2, Search } from 'lucide-react'
import toast from 'react-hot-toast'

const Patients = () => {
  const { user } = useSelector((state) => state.auth)
  const { data, isLoading } = useGetPatientsQuery()
  const [createPatient] = useCreatePatientMutation()
  const [deletePatient] = useDeletePatientMutation()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', age: '', gender: 'male', contact: '', email: '', bloodGroup: '', address: '' })

  const patients = (data?.data || data || []).filter(p => p.name?.toLowerCase().includes(search.toLowerCase()))

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPatient(form).unwrap()
      toast.success('Patient added!')
      setForm({ name: '', age: '', gender: 'male', contact: '', email: '', bloodGroup: '', address: '' })
      setShowForm(false)
    } catch (err) { toast.error(err?.data?.message || 'Failed') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return
    try { await deletePatient(id).unwrap(); toast.success('Deleted!') } catch { toast.error('Delete failed') }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center"><Users className="w-6 h-6 text-blue-600" /></div>
          <div><h1 className="text-2xl font-black text-slate-900">Patients</h1><p className="text-sm text-slate-500">{patients.length} total records</p></div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input-field pl-10 py-2 text-sm" placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {['admin','doctor','receptionist'].includes(user?.role) && (
            <button onClick={() => setShowForm(!showForm)} className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${showForm ? 'bg-slate-100 text-slate-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'}`}>
              {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Patient</>}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">New Patient Registration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="input-field" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input className="input-field" placeholder="Age *" type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} required />
            <select className="input-field" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>
              <option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
            </select>
            <input className="input-field" placeholder="Contact *" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} required />
            <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input className="input-field" placeholder="Blood Group" value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})} />
            <input className="input-field md:col-span-3" placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
          </div>
          <button type="submit" className="btn-primary mt-6">Save Patient</button>
        </form>
      )}

      {isLoading ? <p className="text-slate-500 text-center py-20">Loading...</p> : patients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-20">
          <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No patients found</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {patients.map((p) => (
            <div key={p._id} className="bg-white rounded-xl p-5 border border-slate-100 flex justify-between items-center hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">{p.name?.charAt(0)}</div>
                <div>
                  <h3 className="font-semibold text-slate-800">{p.name}</h3>
                  <p className="text-slate-500 text-sm">Age: {p.age} · {p.gender} · {p.contact} {p.bloodGroup && `· ${p.bloodGroup}`}</p>
                </div>
              </div>
              {user?.role === 'admin' && (
                <button onClick={() => handleDelete(p._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Patients
