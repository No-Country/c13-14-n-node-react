// import useKeys from '../../hooks/useKeys'
import useLocalStorage from '../../hooks/useLocalStorage'
// import { KEY_LOADER } from '../../config/constants'

/* import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner' */

import { useEffect } from 'react'

function Loader ({ childern }) {
  // const { getKey } = useKeys()
  const { loadLocalStorage } = useLocalStorage()

  // Cargo datos locales
  useEffect(() => loadLocalStorage(), [])

  // Devuelvo el estado del loader
  // const loader = ({ childern }) => false // getKey(KEY_LOADER)

  return { childern }

  /* return (
      <Container className='' >
      <Row >
        <Col className='align-items-center '>
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    </Container>

  ) */
}

export default Loader
