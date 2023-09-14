import { setProfile as setProfileSlice } from '../reducers/profile.slice'
import { useSelector, useDispatch } from 'react-redux'
import useLoader from './useLoader'
import { createProfileService, loadProfileService, deleteProfilefileService, findPublicProfileService } from '../services/profile.service'
import { APP_KEY_TOKEN, PROFILE_INICIAL_STATE } from '../config/constants'
import useUserProfiles from './useUserProfiles'
import { createUserManagerService } from '../services/userProfile.service'

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
  const addUserManager = async (email) => {
    const res = await createUserManagerService(email)
    console.log(res)
  }
  const deleteProfile = async (id) => {
    const res = await handleService(deleteProfilefileService, id)
    if (res.solved) {
      // Verificar si la propiedad "profiles" existe en el objeto "profile"
      if (profile && profile.profiles && Array.isArray(profile.profiles)) {
        const newState = {
          ...profile,
          profiles: profile.profiles.filter(profile => profile._id !== id)
        }
        setProfile(newState)
      }
    }
    return res
  }

  const loadPublicProfile = async (nameSpace) => {
    const res = await findPublicProfileService(nameSpace)
    res.solved && setProfile(res.payload)
    return res
  }

  return { profile, setProfile, addProfile, profileSelection, addUserManager, deleteProfile, loadPublicProfile }
}
