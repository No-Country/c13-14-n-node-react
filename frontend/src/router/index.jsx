import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '../layouts/root.laypout'

import Landing from '../pages/landing.page'
import Login from '../pages/login.page'
import Register from '../pages/register.page'
import Validate from '../pages/validate.page'

import Admin from '../pages/admin.page'

import Error from '../pages/error.page'

import ProtectedRoute from '../pages/protected.page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <Error/>,
    children: [
      { path: '/', element: <Landing/> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/validate', element: <Validate /> },
      { path: '/admin', element: <Admin /> }
      // {
      //   path: '/',
      //   element: <ProtectedRoute/>,
      //   children: [
      //     { path: '/admin', element: <Admin /> }
      //   ]
      // }
    ]
  }
])

export default router
