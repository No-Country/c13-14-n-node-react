import { Outlet } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

import { useEffect } from 'react'
import useLoader from '../hooks/useLoader'
import Loader from '../components/Loader'

export default function RootLayout () {
  const { loaderValue } = useLoader()
  const { loadLocalStorage } = useLocalStorage()
  useEffect(() => loadLocalStorage(), [])
  return (
    <main>
      {loaderValue && <Loader/>}
      <Outlet/>
    </main>
  )
}
