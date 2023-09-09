import { Navigate, Outlet } from 'react-router-dom'
import useSession from '../hooks/useSession'

export default function ProtectedRoute ({ children, redirectTo = '/' }) {
  const { user } = useSession()
  return !user?.email ? <Navigate to={redirectTo} /> : (children || <Outlet />)
}
