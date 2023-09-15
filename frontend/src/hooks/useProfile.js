import { setProfile as setProfileSlice } from '../reducers/profile.slice'
import { useSelector, useDispatch } from 'react-redux'
import useLoader from './useLoader'
import { createProfileService, loadProfileService, deleteProfilefileService, findPublicProfileService, updateProfileService } from '../services/profile.service'
import { APP_KEY_TOKEN, INICIAL_SOCIAL_ICONS, PROFILE_INICIAL_STATE } from '../config/constants'
import useUserProfiles from './useUserProfiles'
import { createUserManagerService, deleteUserManagerService } from '../services/userProfile.service'

export default function useProfile () {
  const profile = useSelector(state => state.profile)
  const { addUserProfile } = useUserProfiles()
  const userProfile = useSelector(state => state.userProfile)

  const { handleService } = useLoader()
  const dispatch = useDispatch()

  const setProfile = (profile) => {
    const social = profile?.social || INICIAL_SOCIAL_ICONS
    dispatch(setProfileSlice({ ...profile, social }))
  }

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
    const res = await handleService(loadProfileService, id)
    // const res = await loadProfileService(id)
    if (res.solved) {
      const { profile, token } = res.payload
      setProfile(profile)
      window.localStorage.setItem(APP_KEY_TOKEN, token)
    }
    return res
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
    console.log(res)
    res.solved && setProfile(res.payload)
    return res
  }

  const updateSocialIcon = async ({ socialName, value }) => {
    const social = { ...profile.social, [socialName]: value }
    const res = await handleService(updateProfileService, { social })
    if (res.solved) setProfile({ ...profile, social })

    return res
  }

  const addUserManager = async (email) => {
    const res = await createUserManagerService(email)
    console.log(res)
  }

  const deleteUserManager = async (id) => {
    const res = await handleService(deleteUserManagerService, id)
    if (res.solved) {
      // Verificar si la propiedad "profiles" existe en el objeto "profile"
      if (userProfile && userProfile.userProfiles && Array.isArray(userProfile.userProfiles)) {
        const newState = {
          ...userProfile,
          userProfile: userProfile.userProfiles.filter(userProfile => userProfile._id !== id)
        }
        setProfile(newState)
      }
    }
    return res
  }

  return {
    profile,
    setProfile,
    addProfile,
    profileSelection,
    addUserManager,
    deleteProfile,
    loadPublicProfile,
    updateSocialIcon,
    deleteUserManager
  }
}
