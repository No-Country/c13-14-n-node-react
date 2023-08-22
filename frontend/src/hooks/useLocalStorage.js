import useLanguage from './useLanguage'
import useSession from './useSession'

import { APP_SESSION, APP_LANGUAGE, DEFAULT_LANGUAGE } from '../config/constants'

export default function useLocalStorage () {
  const { setLanguage } = useLanguage()
  const { login } = useSession()

  const loadLocalStorage = () => {
    const language = window.localStorage.getItem(APP_LANGUAGE) || DEFAULT_LANGUAGE
    setLanguage(language)

    const session = window.localStorage.getItem(APP_SESSION)
    // !!session && login(JSON.parse(session), false) */
  }

  return { loadLocalStorage }
}
