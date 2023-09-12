import { setProfile as setProfileSlice } from '../reducers/profile.slice'
import { useSelector, useDispatch } from 'react-redux'
import useKey from './useKey'

export default function useLanguage (key) {
  const profile = useSelector(state => state.profile)
  const [toggle, setToggle] = useKey('toogleProfile')

  const dispatch = useDispatch()

  const setProfile = (data) => dispatch(setProfileSlice(data))

  return { profile, setProfile, toggle, setToggle }
}
