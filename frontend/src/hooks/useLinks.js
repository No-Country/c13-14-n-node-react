import { createLinkService, deleteLinkService, updateLinkService } from '../services/links.service'

import useProfile from './useProfile'

export default function useLinks () {
  const { profile: { links }, setProfile } = useProfile()

  const addLink = async (newLink) => {
    // Petición a la API
    const res = await createLinkService(newLink)
    // Si se creo actualizo el estado local
    res && setProfile({ links: [...links, newLink] })
    return res
  }

  const deleteLink = async (id) => {
    // Petición a la API
    const res = await deleteLinkService(id)
    // Si pudo eliminar borro del estado
    if (res) {
      // Filtro del nuevo estado el id
      const newState = links.filter(link => link.id !== id)
      // Envío al estado global
      setProfile({ links: newState })
    }
    return res
  }

  // Funcion para editar un link.
  // data debe ser un objeto con las propiedades a modificar
  const editLink = async (id, data) => {
    const res = await updateLinkService(id, data)
    if (res) {
      // Busco el id y reemplazo los nuevos datos recibidos
      const newState = links.map(link => link.id === id ? { ...link, data } : link)
      setProfile({ links: newState })
    }
    return res
  }

  const sortLink = (from, to) => links

  return { links, addLink, deleteLink, editLink, sortLink }
}
