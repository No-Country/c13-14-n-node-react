import { setProfile as setProfileSlice } from '../reducers/profile.slice'
import { useSelector, useDispatch } from 'react-redux'

export default function useLanguage (key) {
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()

  const setProfile = (data) => dispatch(setProfileSlice(data))

  return { profile, setProfile }
}
