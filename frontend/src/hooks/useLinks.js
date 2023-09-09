import { createLinkService, deleteLinkService, updateLinkService } from '../services/links.service'
import useLoader from './useLoader'
import useProfile from './useProfile'

export default function useLinks () {
  const { profile: { links }, setProfile } = useProfile()
  const { loaderOnOff } = useLoader()

  const addLink = async (newLink) => {
    console.log(newLink)
    const res = await handleService(createLinkService, newLink)
    if (res.solved) {
      const { idLink } = res.payload
      newLink._id = idLink
      setProfile({ links: [...links, newLink] })
    }
    return res
  }

  const deleteLink = async (id) => {
    const res = await handleService(deleteLinkService, id)
    if (res.status) {
      // Filtro del nuevo estado el id
      const newState = links.filter(link => link.id !== id)
      setProfile({ links: newState })
    }
    return res
  }

  // Funcion para editar un link.
  // data debe ser un objeto con las propiedades a modificar
  const editLink = async (id, data) => {
    const res = await handleService(updateLinkService, { id, data })
    if (res.solved) {
      // Busco el id y reemplazo los nuevos datos recibidos
      const newState = links.map(link => link.id === id ? { ...link, data } : link)
      setProfile({ links: newState })
    }
    return res
  }

  const handleService = async (service, param) => {
    loaderOnOff(true)
    const res = await service(param)
    loaderOnOff(false)
    return res
  }

  const nextOrder = () => {
    const orders = links.map(link => Number(link.order))
    if (!orders.length) return 1
    const max = Math.max(...orders)
    return max + 1
  }

  const sortLink = (from, to) => links

  return { links, addLink, deleteLink, editLink, nextOrder, sortLink }
}
