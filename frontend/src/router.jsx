import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import Prescriptions from './pages/Prescriptions'
import AITools from './pages/AITools'
import ManageUsers from './pages/ManageUsers'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import RoleBasedRoute from './components/RoleBasedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <PublicRoute><Login /></PublicRoute> },
      { path: 'signup', element: <PublicRoute><Signup /></PublicRoute> },
      { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: 'patients', element: <RoleBasedRoute roles={['admin','doctor','receptionist']}><Patients /></RoleBasedRoute> },
      { path: 'appointments', element: <ProtectedRoute><Appointments /></ProtectedRoute> },
      { path: 'prescriptions', element: <ProtectedRoute><Prescriptions /></ProtectedRoute> },
      { path: 'ai-tools', element: <RoleBasedRoute roles={['doctor','admin']}><AITools /></RoleBasedRoute> },
      { path: 'manage-users', element: <RoleBasedRoute roles={['admin']}><ManageUsers /></RoleBasedRoute> },
      {
        path: '*',
        element: (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-7xl font-black text-blue-600 mb-4">404</h1>
            <p className="text-slate-400 text-xl">Page Not Found</p>
          </div>
        ),
      },
    ],
  },
])
