import { useState, useEffect } from 'react'
import Toolbar from '../components/Toolbar'
import { Col, Container, Row } from 'react-bootstrap'
import LinksList from '../components/LinksList/LinksList'
import useLoader from '../hooks/useLoader'
import Previewer from '../components/previewer/Previewer'
import SideBar from '../components/sidebar'
import Look from '../components/Look'

export default function AdminPage () {
  const [tab, setTab] = useState(1)

  const { loaderOnOff } = useLoader()

  useEffect(() => { loaderOnOff(false) }, [])

  return (
    <section className='flex-grow min-vh-100'>
<<<<<<< HEAD
      <AdminNavbar setTab={setTab} />
      <Container className='d-flex justify-content-center align-items-center mt-5'>
        <Row>
          <Col sm={12} md={7}>
            {tab === 1 && <LinkList />}
            {tab === 2 && <Look />}
            {tab === 3 && <h2>Settings</h2>}
          </Col>
          <Col sm={12} md={5} className='d-flex justify-content-center align-items-center '>
            <div className='smartphone text-white d-flex justify-content-center align-items-center '>
              <p >Acá va el simulador</p>
            </div>
=======
        <Toolbar setTab={setTab}/>
        <Container className=' mt-5'>
          <Row className='d-flex'>
            <Col sm={12} lg={8}>
              { tab === 1 && <LinksList/> }
              { tab === 2 && <h2>Apariencia</h2> }
              { tab === 3 && <h2>Settings</h2> }
            </Col>
            <Col sm={12} lg={4} className='d-flex justify-content-center'>
              <Previewer/ >
>>>>>>> main
          </Col>
        </Row>
      </Container>
      <SideBar/>
    </section>
  )
}
