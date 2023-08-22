import { configureStore } from '@reduxjs/toolkit'

import sessionReducer from '../reducers/session.slice'
import languageReducer from '../reducers/language.slice'

export default configureStore({
  reducer: {
    session: sessionReducer,
    language: languageReducer
  }
})
