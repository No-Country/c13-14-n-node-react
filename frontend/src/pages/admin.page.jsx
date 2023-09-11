import { useState, useEffect } from 'react'
import Toolbar from '../components/Toolbar'
import { Col, Container, Row } from 'react-bootstrap'
import LinksList from '../components/LinksList/LinksList'
import useLoader from '../hooks/useLoader'
import Previewer from '../components/previewer/Previewer'

export default function AdminPage () {
  const [tab, setTab] = useState(1)

  const { loaderOnOff } = useLoader()

  useEffect(() => { loaderOnOff(false) }, [])

  return (
    <section className='flex-grow min-vh-100'>
        <Toolbar setTab={setTab}/>
        <Container className='d-flex justify-content-center align-items-center mt-5'>
          <Row>
            <Col sm={12} md={8}>
              { tab === 1 && <LinksList/> }
              { tab === 2 && <h2>Apariencia</h2> }
              { tab === 3 && <h2>Settings</h2> }
            </Col>
            <Col sm={12} md={4} className='d-flex justify-content-center align-items-center '>
              <Previewer/ >
          </Col>
        </Row>
      </Container>
    </section>
  )
}
