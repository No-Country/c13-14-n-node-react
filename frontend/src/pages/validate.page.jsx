import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useSession from '../hooks/useSession'
import { APP_URL_ADMIN, APP_URL_LOGIN } from '../config/constants'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
export default function ValidatePage () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { validateUser } = useSession()
  // Verifico si recibo el token por query
  const token = searchParams.get('token')

  // Si tengo query intento validar el token
  useEffect(() => {
    if (token) {
      validateUser(token)
        .then(res => {
          navigate(res ? APP_URL_ADMIN : APP_URL_LOGIN)
        })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventdefault()
  }

  return token
    //! Aca debería haber un loader
    ? (<h1>Token: {token}</h1>)
    : (
    // Si no tengo token muestro el mensaje que se le envio un correo
    <Container className='d-flex min-vh-100 justify-content-center align-items-center'>
      <Row>
        <Col>
        <h3 className='mb-3'>Validá tu correo</h3>
        <Form onSubmit={handleSubmit} method='POST'>
          <Form.Control type="email" placeholder='Tu email' className='mb-3' autofocus />
          <Button type='submit'>Enviar</Button>
        </Form>
        </Col>
      </Row>
    </Container>
      )
}
