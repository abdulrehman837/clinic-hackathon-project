import { useState } from 'react'
import { useSymptomCheckerMutation, usePrescriptionExplanationMutation, useLazyRiskFlaggingQuery } from '../store/api/aiApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { Brain, Stethoscope, FileText, AlertTriangle, Sparkles, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const AITools = () => {
  const [activeTab, setActiveTab] = useState('symptom')
  const [symptoms, setSymptoms] = useState('')
  const [prescription, setPrescription] = useState('')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [result, setResult] = useState(null)

  const [checkSymptoms, { isLoading: checking }] = useSymptomCheckerMutation()
  const [explainPrescription, { isLoading: explaining }] = usePrescriptionExplanationMutation()
  const [triggerRisk, { isLoading: flagging }] = useLazyRiskFlaggingQuery()
  const { data: patientsData } = useGetPatientsQuery()
  const patients = patientsData?.data || patientsData || []

  const tabs = [
    { key: 'symptom', label: 'Symptom Checker', icon: Stethoscope, shortLabel: 'Symptoms' },
    { key: 'prescription', label: 'Rx Explanation', icon: FileText, shortLabel: 'Rx Explain' },
    { key: 'risk', label: 'Risk Flagging', icon: AlertTriangle, shortLabel: 'Risk' },
  ]

  const handleSymptoms = async (e) => {
    e.preventDefault()
    try {
      const res = await checkSymptoms({ symptoms }).unwrap()
      setResult({ type: 'symptom', data: res })
    } catch { toast.error('Failed') }
  }

  const handlePrescription = async (e) => {
    e.preventDefault()
    try {
      const res = await explainPrescription({ prescription }).unwrap()
      setResult({ type: 'prescription', data: res })
    } catch { toast.error('Failed') }
  }

  const handleRisk = async (e) => {
    e.preventDefault()
    if (!selectedPatient) return toast.error('Select a patient')
    try {
      const res = await triggerRisk(selectedPatient).unwrap()
      setResult({ type: 'risk', data: res })
    } catch { toast.error('Failed') }
  }

  const isLoading = checking || explaining || flagging

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">AI Tools</h1>
          <p className="text-xs sm:text-sm text-slate-500">AI-powered clinical assistance</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto scroll-x-mobile pb-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => { setActiveTab(t.key); setResult(null) }}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === t.key
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}>
            <t.icon size={16} />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.shortLabel}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
            {activeTab === 'symptom' && 'Describe Symptoms'}
            {activeTab === 'prescription' && 'Enter Prescription'}
            {activeTab === 'risk' && 'Select Patient'}
          </h2>

          {activeTab === 'symptom' && (
            <form onSubmit={handleSymptoms} className="space-y-4">
              <textarea className="input-field min-h-[140px] sm:min-h-[180px] resize-y text-sm"
                placeholder="Describe the patient's symptoms in detail..."
                value={symptoms} onChange={e => setSymptoms(e.target.value)} required />
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {checking ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : <><Stethoscope size={16} /> Analyze Symptoms</>}
              </button>
            </form>
          )}

          {activeTab === 'prescription' && (
            <form onSubmit={handlePrescription} className="space-y-4">
              <textarea className="input-field min-h-[140px] sm:min-h-[180px] resize-y text-sm"
                placeholder="Paste the prescription text here..."
                value={prescription} onChange={e => setPrescription(e.target.value)} required />
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {explaining ? <><Loader2 size={16} className="animate-spin" /> Explaining...</> : <><FileText size={16} /> Explain Prescription</>}
              </button>
            </form>
          )}

          {activeTab === 'risk' && (
            <form onSubmit={handleRisk} className="space-y-4">
              <select className="input-field" value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} required>
                <option value="">Select a patient</option>
                {patients.map(p => <option key={p._id} value={p._id}>{p.name} — {p.age}y, {p.gender}</option>)}
              </select>
              <button type="submit" disabled={isLoading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {flagging ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : <><AlertTriangle size={16} /> Check Risks</>}
              </button>
            </form>
          )}
        </div>

        {/* Result Panel */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm min-h-[200px] sm:min-h-[280px]">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" /> AI Response
          </h2>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-slate-400">
              <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-violet-400 mb-3" />
              <p className="text-sm">Analyzing with AI...</p>
            </div>
          ) : result ? (
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed text-sm sm:text-base overflow-y-auto max-h-[50vh] sm:max-h-[60vh]">
              <div className="bg-violet-50 rounded-xl p-3 sm:p-4 mb-4">
                <p className="text-xs font-semibold text-violet-600 mb-1 uppercase">
                  {result.type === 'symptom' && 'Symptom Analysis'}
                  {result.type === 'prescription' && 'Prescription Explanation'}
                  {result.type === 'risk' && 'Risk Assessment'}
                </p>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm bg-slate-50 rounded-xl p-3 sm:p-4 overflow-x-auto">
                {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-slate-300">
              <Brain className="w-12 h-12 sm:w-16 sm:h-16 mb-3" />
              <p className="text-sm text-slate-400 text-center px-4">Results will appear here after analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AITools