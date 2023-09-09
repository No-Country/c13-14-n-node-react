import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "gonzalo",
  photo: "https://placehold.co/64x64/black/white",
  _id: "64ed20d41a9768ea40da2020"
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      return action.payload
    },
    unsetSession: (state) => {
      return initialState
    },
    notAuthorized: (state) => {
      return initialState
    }
  }
})

export const { setSession, unsetSession, notAuthorized } = sessionSlice.actions
export default sessionSlice.reducer
