import { Outlet } from 'react-router-dom'

import useLoader from '@/hooks/useLoader'
import Loader from '@/components/Loader'
import { useEffect } from 'react'

import useLanguage from '@/hooks/useLanguage'

import { APP_KEY_LANGUAGE, DEFAULT_LANGUAGE } from '@/config/constants'

export default function RootLayout ({ session, language }) {
  const { loaderValue, loaderOnOff } = useLoader(true)
  const { setLanguage } = useLanguage()

  useEffect(() => {
    const language = window.localStorage.getItem(APP_KEY_LANGUAGE) || DEFAULT_LANGUAGE
    setLanguage(language)
    loaderOnOff(false)
    /* const token = window.localStorage.getItem(APP_KEY_TOKEN)
    token
      ? authToken(token).finally(loaderOnOff(false))
      : loaderOnOff(false) */
  }, [])

  return (
    <main>
      {loaderValue && <Loader/>}
      <Outlet/>
    </main>
  )
}
