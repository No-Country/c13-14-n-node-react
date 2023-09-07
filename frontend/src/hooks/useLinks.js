import { setLinks, addLink as addLinkSlice, deleteLink as deleteLinkSlice, updateLink as updateLinkSlice, toggleLinkStatus as toggleLinkStatusSlice} from '../reducers/links.slice'
import { useSelector, useDispatch } from 'react-redux'
import { getLinksService, createLinkService, deleteLinkService, uddateLinkService, toggleLinkStatusService } from '../services/links.service'

export default function useLinks () {
  const links = useSelector(state => state.links)
  const dispatch = useDispatch()

  const addLink = (newLink) => {
    createLinkService(newLink)
    dispatch(addLinkSlice(newLink))
  }

  const deleteLink = (_id) => {
    deleteLinkService(_id)
    dispatch(deleteLinkSlice(_id))
  }

  const updateLink = (_id, updatedLink) => {
    dispatch(updateLinkSlice(_id, updatedLink))
  }

  const toggleLinkStatus = (_id, updatedLink) => {
    toggleLinkStatusService(_id, updatedLink)
    dispatch(toggleLinkStatusSlice(_id, updatedLink))
  }

  return { links, addLink, deleteLink, toggleLinkStatus }
}
