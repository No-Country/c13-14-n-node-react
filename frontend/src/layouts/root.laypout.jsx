import { Outlet } from 'react-router-dom'

import useLoader from '../hooks/useLoader'
import Loader from '../components/Loader'
import { localSession, locaLanguage } from '../libs/localStorage'
import { useEffect } from 'react'

import useSession from '../hooks/useSession'
import useLanguage from '../hooks/useLanguage'

export default function RootLayout ({ session, language }) {
  const { loaderValue, loaderOnOff } = useLoader(true)
  const { setSession } = useSession()
  const { setLanguage } = useLanguage()

  useEffect(() => {
    const language = locaLanguage()
    setLanguage(language)
    localSession().then(session => {
      setSession(session)
      loaderOnOff(false)
    })
  }, [])

  return (
    <main>
      {loaderValue && <Loader/>}
      <Outlet/>
    </main>
  )
}
