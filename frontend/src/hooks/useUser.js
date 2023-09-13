import { setUser } from '../reducers/user.slice'
import { useSelector, useDispatch } from 'react-redux'
import useLoader from './useLoader'
import { updatedUserDataService, changePasswordService } from '../services/user.service'

export default function useUser () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { loaderOnOff } = useLoader()

  // data debe ser un objeto con las propiedades a modificar
  const editUser = async (data) => {
    const res = await handleService(updatedUserDataService, data)
    const newData = {
      name: data.name,
      photo: data.photoName
    }
    console.log(data.photoName);
    if (res.solved) {
      // Busco el id y reemplazo los nuevos datos recibidos
      const newState = {...user, ...newData}
      dispatch(setUser(newState))
    }
    return res
  }

  const editPassword = async (password) => {
    return await handleService(changePasswordService, {password})
  }

  const handleService = async (service, param) => {
    loaderOnOff(true)
    const res = await service(param)
    loaderOnOff(false)
    return res
  }
  // const setProfile = (data) => dispatch(setProfileSlice(data))

  return { user, editUser, editPassword }
}
import { useSelector } from 'react-redux'

export default function useUser () {
  const user = useSelector(state => state.user)
  return { user }
}
