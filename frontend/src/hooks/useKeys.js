import { setKey as setKeySlice } from '../reducers/keys.slice'
import { useSelector, useDispatch } from 'react-redux'

export default function useKeys () {
  const keys = useSelector(state => state.keys)
  const dispatch = useDispatch()

  const setKey = (key, value) => {
    dispatch(setKeySlice({ key, value }))
  }

  const getKey = (key) => {
    return keys[key]
  }

  return { getKey, setKey }
}
