import es from '../translations/es'
import en from '../translations/en'

import { setLanguage as setLanguageSlice } from '../reducers/language.slice'
import { useSelector, useDispatch } from 'react-redux'
import { APP_KEY_LANGUAGE } from '../config/constants'

export default function useLanguage (key) {
  const { selected, dictionary } = useSelector(state => state.language)
  const dispatch = useDispatch()

  const dictionaryWord = (value) => {
    if (!dictionary[key]) return '<undefined>'
    return dictionary[key][value] || '<undefined>'
  }

  const setLanguage = (value) => {
    const selected = value
    const dictionary = selected === 'es' ? es : en
    dispatch(setLanguageSlice({ selected, dictionary }))
    window.localStorage.setItem(APP_KEY_LANGUAGE, value)
  }

  return { selected, setLanguage, dictionaryWord }
}
