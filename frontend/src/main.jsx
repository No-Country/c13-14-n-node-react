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
import PublicProfile from './pages/publicProfile'

// Defino cunatos los lugares ver si tiene subdominio
const locationLength = Number(import.meta.env.VITE_LOCATION_LENGTH) || 3 // perfil.miapp.com

const hostname = window.location.hostname
const parts = hostname.split('.')
console.log(parts)
const subdomain = parts.length === locationLength ? parts[0] : null

console.log(subdomain, window.location.hostname)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        {subdomain
          ? <PublicProfile nameSpace={subdomain}/>
          : <RouterProvider router={router}/>
        }
      </Provider>
  </React.StrictMode>
)
