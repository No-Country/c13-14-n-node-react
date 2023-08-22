import { Outlet } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

import Navbar from '../components/navbar'
import { useEffect } from 'react'

export default function RootLayout () {
  const { loadLocalStorage } = useLocalStorage()
  useEffect(() => loadLocalStorage(), [])
  return (
    <div>
      <main>
        <Navbar/>
        <Outlet/>
      </main>
    </div>

  )
}
