import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'

// React-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// Router
import router from './router'

// Redux
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
)
