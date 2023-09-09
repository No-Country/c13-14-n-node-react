import { configureStore } from '@reduxjs/toolkit'

import userReducer from '../reducers/user.slice'
import profileReducer from '../reducers/profile.slice'
import languageReducer from '../reducers/language.slice'
import keysReducer from '../reducers/keys.slice'

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    language: languageReducer,
    keys: keysReducer
  }
})
