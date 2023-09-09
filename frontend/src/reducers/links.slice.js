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
    editLink: (state, action) => {
      
      const { id, name, icon, urlEnlace, status, order } = action.payload
      const links = state.map(link => {
        if (link.id === id) {
          return {
            ...link,
            name,
            icon,
            urlEnlace,
            status,
            order
          }
        }
        return link
      })
      return links

    }
  }
})

export const { setLinks, addLink, deleteLink, editLink } = linksSlice.actions
export default linksSlice.reducer
