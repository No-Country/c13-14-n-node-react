import useSession from './useSession'

export default function useUser () {
  const { user, setSession } = useSession()

  const addUserProfile = (newProfile) => {
    const userProfiles = [...user.userProfiles, newProfile]
    setSession({ solved: true, payload: { ...user, userProfiles } })
  }

  return { addUserProfile }
}
