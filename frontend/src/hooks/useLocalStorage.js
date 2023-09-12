import useLanguage from './useLanguage'
import useSession from './useSession'

import { APP_KEY_TOKEN, APP_KEY_LANGUAGE, DEFAULT_LANGUAGE } from '../config/constants'
import useLoader from './useLoader'

export default function useLocalStorage () {
  const { setLanguage } = useLanguage()
  const { authToken } = useSession()
  const { loaderOnOff } = useLoader()

  const loadLocalStorage = () => {
    const language = window.localStorage.getItem(APP_KEY_LANGUAGE) || DEFAULT_LANGUAGE
    setLanguage(language)
    const token = window.localStorage.getItem(APP_KEY_TOKEN)
    !!token && authToken(token)
    loaderOnOff(false)
  }

  return { loadLocalStorage }
}
