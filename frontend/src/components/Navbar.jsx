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

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-all duration-300">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
              ClinicPro
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={isActive(link.path) ? 'text-blue-600' : 'text-gray-400'}>
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all">
                  Sign Up
                </Link>
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 pt-2 space-y-1 bg-white border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
                isActive(link.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50">
              <FiLogOut size={18} />
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50">Login</Link>
              <Link to="/signup" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 rounded-lg">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar