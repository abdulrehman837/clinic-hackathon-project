import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetPrescriptionsQuery, useCreatePrescriptionMutation } from '../store/api/prescriptionApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { Pill, Plus, X, Download, PlusCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Prescriptions = () => {
  const { user } = useSelector((state) => state.auth)
  const { data, isLoading } = useGetPrescriptionsQuery()
  const { data: patientData } = useGetPatientsQuery()
  const [createPrescription] = useCreatePrescriptionMutation()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ patient: '', diagnosis: '', notes: '' })
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }])

  const prescriptions = data?.data || data || []
  const patients = patientData?.data || patientData || []

  const addMed = () => setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }])
  const removeMed = (i) => setMedications(medications.filter((_, idx) => idx !== i))
  const updateMed = (i, f, v) => { const m = [...medications]; m[i][f] = v; setMedications(m) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createPrescription({ ...form, medications }).unwrap()
      toast.success('Prescription created!')
      setForm({ patient: '', diagnosis: '', notes: '' })
      setMedications([{ name: '', dosage: '', frequency: '', duration: '' }])
      setShowForm(false)
    } catch (err) { toast.error(err?.data?.message || 'Failed') }
  }

  const handlePDF = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/prescriptions/${id}/pdf`, { headers: { Authorization: `Bearer ${token}` } })
      const blob = await res.blob()
      window.open(URL.createObjectURL(blob), '_blank')
    } catch { toast.error('PDF download failed') }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center"><Pill className="w-6 h-6 text-violet-600" /></div>
          <div><h1 className="text-2xl font-black text-slate-900">Prescriptions</h1><p className="text-sm text-slate-500">{prescriptions.length} total</p></div>
        </div>
        {user?.role === 'doctor' && (
          <button onClick={() => setShowForm(!showForm)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${showForm ? 'bg-slate-100 text-slate-600' : 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'}`}>
            {showForm ? <><X size={16}/> Cancel</> : <><Plus size={16}/> New Prescription</>}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg mb-8 space-y-5">
          <h3 className="text-lg font-bold text-slate-800">Write Prescription</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select className="input-field" value={form.patient} onChange={e => setForm({...form, patient: e.target.value})} required>
              <option value="">Select Patient *</option>
              {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            <input className="input-field" placeholder="Diagnosis *" value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})} required />
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-700">Medications</h4>
              <button type="button" onClick={addMed} className="flex items-center gap-1 text-blue-600 text-sm font-semibold hover:text-blue-700"><PlusCircle size={16}/> Add</button>
            </div>
            {medications.map((med, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
                <input className="input-field" placeholder="Medicine *" value={med.name} onChange={e => updateMed(i,'name',e.target.value)} required />
                <input className="input-field" placeholder="Dosage" value={med.dosage} onChange={e => updateMed(i,'dosage',e.target.value)} />
                <input className="input-field" placeholder="Frequency" value={med.frequency} onChange={e => updateMed(i,'frequency',e.target.value)} />
                <input className="input-field" placeholder="Duration" value={med.duration} onChange={e => updateMed(i,'duration',e.target.value)} />
                {medications.length > 1 && (
                  <button type="button" onClick={() => removeMed(i)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><X size={18}/></button>
                )}
              </div>
            ))}
          </div>
          <input className="input-field" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-7 rounded-xl transition-all shadow-lg w-full">Save Prescription</button>
        </form>
      )}

      {isLoading ? <p className="text-center py-20 text-slate-400">Loading...</p> : prescriptions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 text-center py-20">
          <Pill className="w-16 h-16 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">No prescriptions found</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {prescriptions.map(p => (
            <div key={p._id} className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {(p.patient?.name || 'P')[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{p.patient?.name || 'Patient'}</h3>
                  <p className="text-slate-400 text-sm">{p.diagnosis} · {p.medications?.length || 0} meds · {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <button onClick={() => handlePDF(p._id)} className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-600 hover:bg-violet-100 rounded-lg text-sm font-semibold transition-all">
                <Download size={16}/> PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Prescriptions
