import { Link } from 'react-router-dom'
import { APP_URL_LOGIN, APP_URL_REGISTER } from '../../config/constants'
import useLanguage from '../../hooks/useLanguage'

export default function Navbar () {
  const { dictionaryWord } = useLanguage()
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Unilink</div>
          <ul className="flex space-x-4">
            <Link className="text-white hover:text-blue-300" to={APP_URL_LOGIN}>
              {dictionaryWord('navbar.login')}
            </Link>
            <Link className="text-white hover:text-blue-300" to={APP_URL_REGISTER}>
              {dictionaryWord('navbar.register')}
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}
