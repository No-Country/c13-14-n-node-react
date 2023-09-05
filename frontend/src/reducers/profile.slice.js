import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nameSpace: 'gonzaloTest'
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      return { ...action.payload }
    }
  }
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer
