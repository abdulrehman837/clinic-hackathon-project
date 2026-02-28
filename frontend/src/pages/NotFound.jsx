import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <p className="text-2xl text-gray-400 mt-4 mb-8">Page Not Found</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  )
}

export default NotFound