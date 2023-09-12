import { useSelector } from 'react-redux'

export default function useUser (key) {
  const user = useSelector(state => state.user)
  return { user }
}
