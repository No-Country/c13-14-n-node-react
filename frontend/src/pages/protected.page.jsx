import { Navigate, Outlet } from 'react-router-dom'
import useSession from '../hooks/useSession'

export default function ProtectedRoute ({ children, redirectTo = '/' }) {
  const { session } = useSession()
  return !session?.user ? <Navigate to={redirectTo} /> : (children || <Outlet />)
}
