import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  const { pathname } = useLocation()

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-slate-50 overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-14 sm:pt-16"><Outlet /></main>
      <Footer />
    </div>
  )
}

export default Layout