import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = token
    ? [
        { name: "Dashboard", path: "/dashboard", icon: "📊" },
        { name: "Patients", path: "/patients", icon: "👥" },
        { name: "Appointments", path: "/appointments", icon: "📅" },
      ]
    : [
        { name: "Home", path: "/", icon: "🏠" },
        { name: "About", path: "/about", icon: "ℹ️" },
      ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/10"
            : "bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900"
        }`}
      >
        {/* Top Gradient Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer bg-[length:200%_100%]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/60">
                  <span className="text-white font-bold text-lg md:text-xl">🏥</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  ClinicPro
                </span>
                <span className="text-[10px] text-blue-400/70 font-medium tracking-widest uppercase hidden sm:block">
                  Management System
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group
                    ${
                      isActive(link.path)
                        ? "text-white bg-white/10"
                        : "text-gray-300 hover:text-white"
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-base group-hover:animate-bounce-slow">{link.icon}</span>
                    {link.name}
                  </span>
                  
                  {/* Hover Background */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  {/* Active Indicator */}
                  {isActive(link.path) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                  )}
                  
                  {/* Hover Underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-8 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-3">
              {token ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/60 transition-all duration-300">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-white text-sm font-semibold">{user?.name || "User"}</span>
                      <span className="text-blue-400 text-[10px] font-medium">{user?.role || "Doctor"}</span>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 animate-slideDown overflow-hidden">
                      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-cyan-600/10">
                        <p className="text-white font-semibold text-sm">{user?.name}</p>
                        <p className="text-blue-400 text-xs mt-0.5">{user?.email}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm">
                          <span>📊</span> Dashboard
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm">
                          <span>👤</span> Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-sm mt-1"
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="relative px-5 py-2.5 text-sm font-semibold text-blue-400 hover:text-white rounded-xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group overflow-hidden"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:to-cyan-600/20 transition-all duration-300" />
                  </Link>
                  <Link
                    to="/signup"
                    className="relative px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 hover:scale-105 active:scale-95 group overflow-hidden"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/0 transition-all duration-300" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center justify-center w-6 h-6">
                <span className={`block w-6 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <span className={`block w-4 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full my-[4px] transition-all duration-300 ${isOpen ? "opacity-0 scale-0" : ""}`} />
                <span className={`block w-6 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-gray-900/98 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 animate-slideIn
                    ${isActive(link.path) 
                      ? "text-white bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.name}
                  {isActive(link.path) && (
                    <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/10 mt-3">
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    🚪 Logout
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link to="/login" className="w-full text-center px-4 py-3 text-blue-400 border border-blue-500/30 rounded-xl text-sm font-semibold hover:bg-blue-500/10 transition-all duration-300">
                      Login
                    </Link>
                    <Link to="/signup" className="w-full text-center px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/60 transition-all duration-300">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;