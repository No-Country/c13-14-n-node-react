import { Link } from 'react-router-dom'
import { APP_URL_LOGIN, APP_URL_REGISTER } from '../../config/constants'

export default function Navbar () {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Unilink</div>
          <ul className="flex space-x-4">
            <Link className="text-white hover:text-blue-300" to={APP_URL_LOGIN}>Login</Link>
            <Link className="text-white hover:text-blue-300" to={APP_URL_REGISTER}>Register</Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}
