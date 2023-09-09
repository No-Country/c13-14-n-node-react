import { createSlice } from '@reduxjs/toolkit'
import { USER_INICIAL_STATE } from '../config/constants'

const initialState = USER_INICIAL_STATE

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
