import { setProfile } from '../reducers/profile.slice'
import { useSelector, useDispatch } from 'react-redux'

export default function useLanguage (key) {
  const profile = useSelector(state => state.profile)
  // const dispatch = useDispatch()

  return { profile }
}
