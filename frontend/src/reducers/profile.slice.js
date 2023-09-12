import { createSlice } from '@reduxjs/toolkit'
import { PROFILE_INICIAL_STATE } from '../config/constants'

const initialState = PROFILE_INICIAL_STATE

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
