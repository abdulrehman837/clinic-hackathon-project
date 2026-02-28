import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowRight, Shield, Brain, Calendar, FileText, Activity, Users, Star, Zap, HeartPulse, Stethoscope } from 'lucide-react'

const Home = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className="overflow-hidden">
      {/* ====== HERO ====== */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/30">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }} />

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
              <Zap size={14} /> #1 AI-Powered Healthcare Platform
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.08] mb-6 text-slate-900">
              Smart{' '}
              <span className="gradient-text">Healthcare</span>
              <br />at Your Fingertips
            </h1>
            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              AI-powered diagnostics, seamless scheduling, and digital prescriptions — transforming how modern clinics operate.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to={user ? '/dashboard' : '/signup'} className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center gap-2">
                {user ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl border border-slate-200 hover:-translate-y-0.5">
                Learn More
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Shield size={15} className="text-green-500" /> HIPAA Compliant</span>
              <span className="flex items-center gap-1.5"><Star size={15} className="text-amber-500" /> 4.9/5 Rating</span>
              <span className="flex items-center gap-1.5"><Users size={15} className="text-blue-500" /> 10K+ Users</span>
            </div>
          </div>

          <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-600 to-violet-600 rounded-[2rem] z-0" />
              <div className="relative z-10 hero-3d">
                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=700&fit=crop&crop=top" alt="Doctor" className="rounded-[2rem] shadow-2xl w-full object-cover" />
              </div>
              <div className="absolute -left-10 top-12 bg-white rounded-2xl p-4 shadow-2xl z-20 animate-float border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><HeartPulse className="w-6 h-6 text-green-600" /></div>
                  <div><p className="font-bold text-slate-800">AI Diagnosis</p><p className="text-xs text-green-600 font-semibold">98.5% Accuracy</p></div>
                </div>
              </div>
              <div className="absolute -right-10 bottom-20 bg-white rounded-2xl p-4 shadow-2xl z-20 animate-float-delayed border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Calendar className="w-6 h-6 text-blue-600" /></div>
                  <div><p className="font-bold text-slate-800">1,250+</p><p className="text-xs text-slate-500">Appointments Today</p></div>
                </div>
              </div>
              <div className="absolute left-1/2 -bottom-6 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-2xl z-20 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center"><Stethoscope className="w-6 h-6 text-violet-600" /></div>
                  <div><p className="font-bold text-slate-800">500+</p><p className="text-xs text-slate-500">Expert Doctors</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-blue-600 font-semibold mb-3">POWERFUL FEATURES</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Comprehensive tools built for modern healthcare professionals</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, title: 'AI Diagnostics', desc: 'Smart symptom analysis and real-time risk assessment', iconBg: 'bg-blue-100', iconClr: 'text-blue-600', border: 'hover:border-blue-200' },
              { icon: Calendar, title: 'Smart Scheduling', desc: 'Effortless appointment booking and management', iconBg: 'bg-emerald-100', iconClr: 'text-emerald-600', border: 'hover:border-emerald-200' },
              { icon: FileText, title: 'Digital Rx', desc: 'Create, manage and download prescriptions as PDF', iconBg: 'bg-violet-100', iconClr: 'text-violet-600', border: 'hover:border-violet-200' },
              { icon: Shield, title: 'Secure Records', desc: 'HIPAA-compliant patient data and audit logging', iconBg: 'bg-amber-100', iconClr: 'text-amber-600', border: 'hover:border-amber-200' },
            ].map((f, i) => (
              <div key={i} className={`card-3d bg-white rounded-2xl p-8 border border-slate-100 ${f.border}`}>
                <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                  <f.icon className={`w-7 h-7 ${f.iconClr}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 rounded-3xl p-14 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {[
                { num: '10,000+', label: 'Patients Served' },
                { num: '500+', label: 'Expert Doctors' },
                { num: '50,000+', label: 'Appointments' },
                { num: '99.9%', label: 'Uptime SLA' },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-4xl lg:text-5xl font-black">{s.num}</p>
                  <p className="text-blue-100 mt-2 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== DOCTORS ====== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-semibold mb-3">OUR TEAM</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">Meet Our Doctors</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face', name: 'Dr. James Wilson', spec: 'Cardiologist' },
              { img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face', name: 'Dr. Sarah Chen', spec: 'Neurologist' },
              { img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face', name: 'Dr. Michael Brown', spec: 'Orthopedic Surgeon' },
            ].map((d, i) => (
              <div key={i} className="card-3d bg-white rounded-3xl overflow-hidden border border-slate-100 text-center group">
                <div className="h-64 overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800">{d.name}</h3>
                  <p className="text-blue-600 font-medium">{d.spec}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to Transform<br />Your Clinic?</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Join thousands of healthcare providers who trust MedAI Clinic for smarter patient care.</p>
              <Link to="/signup" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5">
                Start Free Today <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
