import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    setLinks: (state, action) => {
      return action.payload
    },
    addLink: (state, action) => {
      const links = [...state]
      links.push(action.payload)
      return links
    },
    deleteLink: (state, action) => {
      const links = state.filter(link => link.id !== action.payload)
      return links
    },
    updateLink: (state, action) => {
      const { id, updatedLink } = action.payload
      const links = state.map(link => {
        if (link.id === id) {
          return { ...link, ...updatedLink }
        }
        return link
      })
      return links
    },
    toggleLinkStatus: (state, action) => {
      const { _id, status } = action.payload
      const links = state.map(link => {
        if (link._id === _id) {
          return { ...link, status }
        }
        return link
      })
      return links
    }
  }
})

export const { setLinks, addLink, deleteLink, updateLink, toggleLinkStatus } = linksSlice.actions
export default linksSlice.reducer
