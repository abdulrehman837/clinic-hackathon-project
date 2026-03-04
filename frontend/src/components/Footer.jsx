import { Activity } from 'lucide-react'

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 mt-auto safe-bottom">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
      <div className="flex items-center gap-2 font-bold text-slate-700">
        <Activity size={18} className="text-blue-600" /> MedAI Clinic
      </div>
      <p className="text-center">© 2026 MedAI Clinic. All rights reserved.</p>
    </div>
  </footer>
)

export default Footer