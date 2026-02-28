import { useState } from 'react'
import { useSymptomCheckerMutation, usePrescriptionExplanationMutation, useLazyRiskFlaggingQuery } from '../store/api/aiApi'
import { useGetPatientsQuery } from '../store/api/patientApi'
import { Bot, Search, FileText, AlertTriangle, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

const AITools = () => {
  const [tab, setTab] = useState('symptoms')
  const [symptoms, setSymptoms] = useState('')
  const [rxText, setRxText] = useState('')
  const [patientId, setPatientId] = useState('')
  const [result, setResult] = useState(null)

  const [checkSymptoms, { isLoading: symL }] = useSymptomCheckerMutation()
  const [explainRx, { isLoading: expL }] = usePrescriptionExplanationMutation()
  const [triggerRisk, { isLoading: riskL }] = useLazyRiskFlaggingQuery()
  const { data: patData } = useGetPatientsQuery()
  const patients = patData?.data || patData || []

  const handleSymptoms = async (e) => {
    e.preventDefault()
    try { const r = await checkSymptoms({ symptoms: symptoms.split(',').map(s=>s.trim()) }).unwrap(); setResult(r) }
    catch (err) { toast.error(err?.data?.message || 'Failed') }
  }
  const handleExplain = async (e) => {
    e.preventDefault()
    try { const r = await explainRx({ prescription: rxText }).unwrap(); setResult(r) }
    catch (err) { toast.error(err?.data?.message || 'Failed') }
  }
  const handleRisk = async (e) => {
    e.preventDefault()
    if (!patientId) return toast.error('Select patient')
    try { const r = await triggerRisk(patientId).unwrap(); setResult(r) }
    catch (err) { toast.error(err?.data?.message || 'Failed') }
  }

  const tabs = [
    { id: 'symptoms', label: 'Symptom Checker', icon: Search },
    { id: 'explain', label: 'Rx Explanation', icon: FileText },
    { id: 'risk', label: 'Risk Flagging', icon: AlertTriangle },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center"><Bot className="w-6 h-6 text-rose-600" /></div>
        <div><h1 className="text-2xl font-black text-slate-900">AI Diagnostic Tools</h1><p className="text-sm text-slate-500">Powered by artificial intelligence</p></div>
      </div>

      <div className="flex bg-slate-100 rounded-xl p-1 gap-1 mb-8 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); setResult(null) }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              tab === t.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          {tab === 'symptoms' && (
            <form onSubmit={handleSymptoms} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Enter Symptoms</label>
                <p className="text-xs text-slate-400 mb-3">Separate with commas</p>
                <textarea className="input-field h-32 resize-none" placeholder="e.g. headache, fever, fatigue, nausea" value={symptoms} onChange={e => setSymptoms(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={symL}>
                {symL ? 'Analyzing...' : <><Sparkles size={18}/> Analyze Symptoms</>}
              </button>
            </form>
          )}
          {tab === 'explain' && (
            <form onSubmit={handleExplain} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Prescription Details</label>
                <textarea className="input-field h-32 resize-none" placeholder="e.g. Amoxicillin 500mg 3x daily for 7 days..." value={rxText} onChange={e => setRxText(e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={expL}>
                {expL ? 'Explaining...' : <><Sparkles size={18}/> Explain Prescription</>}
              </button>
            </form>
          )}
          {tab === 'risk' && (
            <form onSubmit={handleRisk} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Patient</label>
                <select className="input-field" value={patientId} onChange={e => setPatientId(e.target.value)} required>
                  <option value="">Choose a patient...</option>
                  {patients.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={riskL}>
                {riskL ? 'Assessing...' : <><Sparkles size={18}/> Assess Risk</>}
              </button>
            </form>
          )}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Bot size={20} className="text-blue-600"/> AI Result</h3>
          {result ? (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{typeof result === 'string' ? result : JSON.stringify(result?.data || result, null, 2)}</pre>
            </div>
          ) : (
            <div className="text-center py-16">
              <Bot className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">Results will appear here</p>
              <p className="text-slate-300 text-sm mt-1">Submit a query to get AI analysis</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AITools
