import { configureStore } from '@reduxjs/toolkit'

import sessionReducer from '../reducers/session.slice'
import languageReducer from '../reducers/language.slice'
import keysReducer from '../reducers/keys.slice'
import togglesReducer from '../reducers/toggles.slice'

export default configureStore({
  reducer: {
    session: sessionReducer,
    language: languageReducer,
    keys: keysReducer,
    toggle: togglesReducer
  }
})
