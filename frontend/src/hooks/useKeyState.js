import { setKey as setKeySlice } from '../reducers/keys.slice'
import { useSelector, useDispatch } from 'react-redux'

export default function useKeyState (key) {
  const keys = useSelector(state => state.keys)
  const dispatch = useDispatch()

  const setKey = (value) => {
    dispatch(setKeySlice({ key, value }))
  }

  const getKey = () => {
    return keys[key]
  }

  return [getKey, setKey]
}
