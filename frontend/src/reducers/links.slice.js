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
    }
    // editLink: (state, action) => {
    //   const { id, name, icon, urlEnlace, status, order } = action.payload
    //   const links = state.map(link => {
    //     if (link.id === id) {
    //       return {
    //         ...link,
    //         name,
    //         icon,
    //         urlEnlace,
    //         status,
    //         order
    //       }
    //     }
    //     return link
    //   })
    //   return links
    // }
  }
})

export const { setLinks, addLink, deleteLink } = linksSlice.actions
export default linksSlice.reducer
