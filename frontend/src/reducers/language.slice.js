import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selected: 'es',
  dictionary: {}
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      return action.payload
    }
  }
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer
