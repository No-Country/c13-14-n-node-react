import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSession from '../hooks/useSession'
export default function ValidatePage () {
  const [searchParams] = useSearchParams()
  const { validateUser } = useSession()
  const token = searchParams.get('token')

  useEffect(() => token && validateUser(token), [])

  return token
    ? (<h1>Token: {token}</h1>)
    : (
    <section className='flex-grow'>
        <h1>Recibiste correo</h1>
    </section>
      )
}
