import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: true
}

const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    setKey: (state, action) => {
      const { key, value } = action.payload
      return { ...state, [key]: value }
    }
  }
})

export const { setKey } = keysSlice.actions
export default keysSlice.reducer
