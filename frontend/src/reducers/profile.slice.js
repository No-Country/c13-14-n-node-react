import { createSlice } from '@reduxjs/toolkit'
import { APP_URL_PROFILE } from '../config/constants'
import axios from 'axios'

const initialState = {
  profile: []
}

const profileState = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    }
  }
})

export const { setProfile } = profileState.actions

export const getAllProfile = (id) => async (dispatch) => {
  try {
    const result = await axios.get(`${APP_URL_PROFILE}/${id}`)
    dispatch(setProfile(result.data.profile))
  } catch (error) {
    console.log(error)
  }
}

export default profileState.reducer
