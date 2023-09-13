import { setProfile as setProfileSlice } from '../reducers/profile.slice'
import { useSelector, useDispatch } from 'react-redux'
import useLoader from './useLoader'
import { createProfileService, loadProfileService } from '../services/profile.service'
import { APP_KEY_TOKEN, PROFILE_INICIAL_STATE } from '../config/constants'
import useUserProfiles from './useUserProfiles'

export default function useProfile () {
  const { addUserProfile } = useUserProfiles()
  const profile = useSelector(state => state.profile)

  const { handleService } = useLoader()

  const dispatch = useDispatch()

  const setProfile = (data) => dispatch(setProfileSlice(data))

  const addProfile = async (nameSpace) => {
    const res = await handleService(createProfileService, nameSpace)
    if (res.solved) {
      const { id } = res.payload
      const newState = { ...PROFILE_INICIAL_STATE, id, nameSpace }
      setProfile(newState)
      addUserProfile({ id, nameSpace, rol: 'owner' })
    }
    return res
  }

  const profileSelection = async (id) => {
    // const res = await handleService(loadProfileService, id)
    const res = await loadProfileService(id)
    if (res.solved) {
      dispatch(setProfileSlice(res.payload.profile))
      window.localStorage.setItem(APP_KEY_TOKEN, res.payload.token)
    }
    return res
  }

  return { profile, setProfile, addProfile, profileSelection }
}
