import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import {
  FiHome, FiUsers, FiCalendar, FiFileText,
  FiCpu, FiLogOut, FiMenu, FiX, FiUserPlus
} from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const publicLinks = [
    { path: '/', label: 'Home', icon: <FiHome size={18} /> },
    { path: '/about', label: 'About', icon: <FiFileText size={18} /> },
    { path: '/contact', label: 'Contact', icon: <FiUsers size={18} /> },
  ]

  const protectedLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome size={18} /> },
    { path: '/patients', label: 'Patients', icon: <FiUsers size={18} />, roles: ['admin', 'doctor', 'receptionist'] },
    { path: '/appointments', label: 'Appointments', icon: <FiCalendar size={18} /> },
    { path: '/prescriptions', label: 'Prescriptions', icon: <FiFileText size={18} /> },
    { path: '/ai-tools', label: 'AI Tools', icon: <FiCpu size={18} />, roles: ['admin', 'doctor'] },
    { path: '/manage-users', label: 'Manage Users', icon: <FiUserPlus size={18} />, roles: ['admin'] },
  ]

  const navLinks = user
    ? protectedLinks.filter((link) => !link.roles || link.roles.includes(user.role))
    : publicLinks

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' : 'bg-white shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-all duration-300">
              <span className="text-white font-bold text-xs sm:text-sm">AI</span>
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden xs:block">
              ClinicPro
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                <span className={isActive(link.path) ? 'text-blue-600' : 'text-gray-400'}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <button onClick={handleLogout}
                className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300">
                <FiLogOut size={18} /> Logout
              </button>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all">Login</Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">Sign Up</Link>
              </div>
            )}
            {/* Mobile hamburger */}
            <button onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Toggle menu">
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-14 sm:top-16 bg-black/20 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-14 sm:top-16 left-0 right-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="bg-white h-full overflow-y-auto safe-bottom shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 active:bg-gray-100'
                }`}>
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 my-3" />
            {user ? (
              <button onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 active:bg-red-100 transition-all">
                <FiLogOut size={18} /> Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 border border-blue-200">Login</Link>
                <Link to="/signup" className="flex items-center justify-center w-full px-4 py-3.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar