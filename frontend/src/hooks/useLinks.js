import { createLinkService, deleteLinkService, updateLinkService } from '../services/links.service'
import useLoader from './useLoader'
import useProfile from './useProfile'

export default function useLinks () {
  const { profile: { links }, setProfile } = useProfile()
  const { handleService } = useLoader()

  const addLink = async (newLink) => {
    console.log(newLink)
    const res = await createLinkService(newLink)
    if (res.solved) {
      const { idLink } = res.payload
      newLink._id = idLink
      setProfile({ links: [...links, newLink] })
    }
    return res
  }

  const deleteLink = async (id) => {
    const res = await handleService(deleteLinkService, id)
    if (res.solved) {
      const newState = links.filter(link => {
        return link._id !== id
      })
      setProfile({ links: newState })
    }
    return res
  }

  // Funcion para editar un link.
  // data debe ser un objeto con las propiedades a modificar
  const updateLink = async (updatedLink) => {
    const res = await updateLinkService(updatedLink)
    if (res.solved) {
      const newState = links.map(link => link._id === updatedLink._id ? updatedLink : link)
      setProfile({ links: newState })
      console.log(setProfile)
    }
    return res
  }

  const nextOrder = () => {
    const orders = links.map(link => Number(link.order))
    if (!orders.length) return 1
    const max = Math.max(...orders)
    return max + 1
  }

  const sortLink = (from, to) => links

  return { links, addLink, deleteLink, updateLink, nextOrder, sortLink }
}
