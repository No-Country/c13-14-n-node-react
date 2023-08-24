import { APP_URL_ACCOUNT, APP_URL_LOGIN, APP_URL_REGISTER } from '../../config/constants'
import NavbarButton from '../buttons/navbar.button'
import useLanguage from '../../hooks/useLanguage'
import useSession from '../../hooks/useSession'

export default function Navbar () {
  const { dictionaryWord } = useLanguage()
  const { hasSession, session } = useSession()

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Unilink</div>
          <ul className="flex space-x-4">
            { !hasSession
              ? (
                  <>
                    <NavbarButton
                      to={APP_URL_LOGIN}
                      label={dictionaryWord('navbar.login')}
                    />
                    <NavbarButton
                      to={APP_URL_REGISTER}
                      label={dictionaryWord('navbar.register')}
                    />
                  </>
                )
              : (
                <NavbarButton
                      to={APP_URL_ACCOUNT}
                      label={session?.fullName}
                    />
                )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}
