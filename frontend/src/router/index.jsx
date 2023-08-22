import { createBrowserRouter } from 'react-router-dom'

import RootLayout from '../layouts/root.laypout'

import Landing from '../pages/landing.page'
import Login from '../pages/login.page'
import Register from '../pages/register.page'
import Error from '../pages/error.page'
// import Admin from '../pages/admin'

// import ProtectedRoute from '../pages/protected'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    errorElement: <Error/>,
    children: [
      { path: '/', element: <Landing/> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> }
      /*    {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
          { path: '/admin', element: <Admin /> }
        ]
      } */
    ]
  }
])

export default router
