import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: 'dadadadadadadad', name: 'Link1', icon: 'icon', urlEnlace: 'https://www.facebook.com/', status: true, order: 1 },
  { id: '344adadadadadad', name: 'Link2', icon: 'icon', urlEnlace: 'https://www.facebook.com/', status: true, order: 1 }
]

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
      const { id, status } = action.payload
      const links = state.map(link => {
        if (link.id === id) {
          return { ...link, status }
        }
        return link
      })
      return links
    },
  }
})

export const { setLinks, addLink, deleteLink, updateLink, toggleLinkStatus } = linksSlice.actions
export default linksSlice.reducer