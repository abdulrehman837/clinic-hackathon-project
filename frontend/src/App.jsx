import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { router } from './router.jsx'

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }
      }} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
