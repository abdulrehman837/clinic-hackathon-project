import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Activity, Brain, Shield, Users, Calendar, FileText,
  ArrowRight, Star, Zap, Heart, CheckCircle2
} from 'lucide-react'

const Home = () => {
  const { user } = useSelector((state) => state.auth)

  const features = [
    { icon: Brain, title: 'AI Diagnostics', desc: 'Smart symptom analysis powered by advanced AI for accurate preliminary assessments', color: 'from-violet-500 to-purple-600' },
    { icon: Calendar, title: 'Smart Scheduling', desc: 'Intelligent appointment management with automated reminders and conflict detection', color: 'from-blue-500 to-cyan-600' },
    { icon: FileText, title: 'Digital Records', desc: 'Secure electronic health records with instant access and comprehensive history', color: 'from-emerald-500 to-teal-600' },
    { icon: Shield, title: 'Data Security', desc: 'Enterprise-grade encryption and HIPAA-compliant data protection protocols', color: 'from-orange-500 to-red-600' },
    { icon: Users, title: 'Team Management', desc: 'Effortlessly manage doctors, staff, and patient relationships in one platform', color: 'from-pink-500 to-rose-600' },
    { icon: Zap, title: 'Real-time Analytics', desc: 'Live dashboards with predictive insights to optimize clinic performance', color: 'from-amber-500 to-yellow-600' },
  ]

  const stats = [
    { value: '10K+', label: 'Patients Served' },
    { value: '500+', label: 'Doctors Active' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9★', label: 'Rating' },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Background decorations - hidden on small screens for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hidden sm:block absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
          <div className="hidden sm:block absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
          <div className="hidden md:block absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>AI-Powered Healthcare Platform</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-tight mb-4 sm:mb-6">
            The Future of
            <span className="gradient-text block sm:inline"> Healthcare</span>
            <br className="hidden sm:block" /> Management
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Transform your clinic with AI-powered diagnostics, smart scheduling,
            and comprehensive patient management — all in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            {user ? (
              <Link to="/dashboard" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center text-center">
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                  Get Started Free <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-secondary w-full sm:w-auto text-center">
                  Learn More
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-16 lg:mt-20 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-3 sm:p-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4">
              Everything You Need
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto px-2">
              Comprehensive tools designed to streamline every aspect of your clinical practice
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {features.map((f) => (
              <div key={f.title} className="card-3d group bg-white rounded-2xl p-5 sm:p-8 border border-slate-100 shadow-sm">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm sm:text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto px-2">
              Healthcare providers trust us for reliable, secure, and innovative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { name: 'Dr. Sarah Chen', role: 'Cardiologist', quote: 'This platform has revolutionized how I manage patient records and diagnostics.' },
              { name: 'Dr. James Wilson', role: 'General Physician', quote: 'The AI-powered tools save me hours every day. Absolutely game-changing.' },
              { name: 'Dr. Priya Patel', role: 'Pediatrician', quote: 'Best clinic management system I\'ve used in 15 years of practice.' },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400 sm:w-4 sm:h-4" />)}
                </div>
                <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    {t.name[4]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm sm:text-base">{t.name}</p>
                    <p className="text-xs sm:text-sm text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden">
          <div className="hidden sm:block absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="hidden sm:block absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 opacity-80" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Join thousands of healthcare professionals who are already using AI to deliver better patient care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/signup" className="bg-white text-blue-600 font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm sm:text-base">
                Start Free Trial
              </Link>
              <Link to="/contact" className="border-2 border-white/30 text-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-xl hover:bg-white/10 transition-all text-sm sm:text-base">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home