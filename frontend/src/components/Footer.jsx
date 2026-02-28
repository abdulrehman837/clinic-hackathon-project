import { Activity } from 'lucide-react'

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
      <div className="flex items-center gap-2 font-bold text-slate-700"><Activity size={18} className="text-blue-600"/> MedAI Clinic</div>
      <p>© 2026 MedAI Clinic. All rights reserved.</p>
    </div>
  </footer>
)

export default Footer
