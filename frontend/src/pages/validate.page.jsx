import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useSession from '../hooks/useSession'
export default function ValidatePage () {
  const [searchParams] = useSearchParams()
  const { validateUser } = useSession()
  // Verifico si recibo el token por query
  const token = searchParams.get('token')

  // Si tengo query intento validar el token
  useEffect(() => {
    if (token) validateUser(token)
  }, [])

  //! Falta renderizar un error si no se logró validar e inicir session

  return token
    //! Aca debería haber un loader
    ? (<h1>Token: {token}</h1>)
    : (
    // Si no tengo token muestro el mensaje que se le envio un correo
    <section className='flex-grow'>
        <h1>Recibiste correo</h1>
    </section>
      )
}
