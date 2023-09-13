import { useNavigate, useRouteError } from 'react-router-dom'
import { useRef } from 'react'

import OutlineButton from '@/components/buttons/outline.button'
import { Col, Container, Row } from 'react-bootstrap'

export default function ErrorPage () {
  const error = useRouteError()
  const navigate = useNavigate()

  const defaultFocus = useRef(null)

  return (
    <Container className='min-vh-100 d-flex justify-content-center align-items-center' >
      <Row className='d-flex justify-content-center align-items-center '>
        <Col className='d-flex flex-column justify-content-center align-items-center '>
          <h1 className='display-1'>{error.status}</h1>
          <h4 className='mb-4 display-5'>{error.statusText}</h4>
          <OutlineButton
            onClick={() => navigate(-1)}
            ref={defaultFocus}
            label='Volver'
          />
       </Col>
      </Row>
    </Container>

  )
}
