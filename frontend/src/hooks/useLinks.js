import { setLinks, addLink as addLinkSlice, deleteLink as deleteLinkSlice } from '../reducers/links.slice'
import { useSelector, useDispatch } from 'react-redux'
import { createLinkService } from '../services/links.service'

export default function useLinks () {
  const links = useSelector(state => state.links)
  const dispatch = useDispatch()



  const addLink = (newLink) => {
    // createLinkService(newLink)
    dispatch(addLinkSlice(newLink))
  }

  const deleteLink = (id) => {
    dispatch(deleteLinkSlice(id))
  }

  const updateLink = (id, updatedLink) => {
    dispatch(updateLink(id, updatedLink))
  }

  const toggleLinkStatus = (id, updatedLink) => {
    dispatch(toggleLinkStatus(id, updatedLink))
  }

  return { links, addLink, deleteLink }
}
