import { Outlet } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

import { useEffect } from 'react'

export default function RootLayout () {
  const { loadLocalStorage } = useLocalStorage()
  useEffect(() => loadLocalStorage(), [])
  return (
    <div>
      <main>
        <Outlet/>
      </main>
    </div>

  )
}
