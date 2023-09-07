import { createSlice } from '@reduxjs/toolkit'
import { APP_URL_PROFILE } from '../config/constants'
import axios from 'axios'
import { useSelector } from 'react-redux'

const initialState = {
  profiles: [],
  newProfile: {}
}

const profileState = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload
    },
    setNewProfile: (state, action) => {
      state.newProfile = action.payload
    }
  }
})

export const { setProfiles, setNewProfile } = profileState.actions

export const createProfile = (data) => async (dispatch) => {
  try {
    await axios.post(`${APP_URL_PROFILE}`, data).then(res => dispatch(setNewProfile(res.data.profile)))
  } catch (error) {
    console.log(error)
  }
}

export const updateProfile = (id) => async (dispatch) => {
  try {

  } catch (error) {
    console.log(error)
  }
}

export const getAllProfile = (id) => async (dispatch) => {
  try {
    const result = await axios.get(`${APP_URL_PROFILE}/${id}`)
    dispatch(setProfiles(result.data.profile))
  } catch (error) {
    console.log(error)
  }
}

export const deleteProfile = (id) => async (dispatch) => {
  try {
    await axios.delete(`${APP_URL_PROFILE}/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export default profileState.reducer
