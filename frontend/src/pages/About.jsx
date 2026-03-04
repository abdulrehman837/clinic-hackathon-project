import { Heart, Users, Zap, Shield, Target, Award } from 'lucide-react'

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Patients Managed' },
    { value: '500+', label: 'Active Doctors' },
    { value: '50+', label: 'Clinics' },
    { value: '99.9%', label: 'Satisfaction' },
  ]

  const values = [
    { icon: Heart, title: 'Patient First', desc: 'Every feature is designed with patient wellbeing as the top priority.' },
    { icon: Shield, title: 'Security', desc: 'Enterprise-grade security to protect sensitive healthcare data.' },
    { icon: Zap, title: 'Innovation', desc: 'Leveraging cutting-edge AI to revolutionize healthcare delivery.' },
    { icon: Target, title: 'Precision', desc: 'Accurate diagnostics and analytics you can rely on.' },
    { icon: Users, title: 'Collaboration', desc: 'Seamless teamwork between doctors, staff, and patients.' },
    { icon: Award, title: 'Excellence', desc: 'Committed to the highest standards in healthcare technology.' },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-3 sm:mb-4">
          About <span className="gradient-text">ClinicPro</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-2">
          We're on a mission to make healthcare management smarter, faster, and more accessible through AI-powered innovation.
        </p>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="stat-card text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-slate-900 mb-10 sm:mb-14 lg:mb-16">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {values.map((v) => (
              <div key={v.title} className="card-3d card">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About