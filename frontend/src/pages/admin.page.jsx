import { useState } from 'react'
import AdminNavbar from '../components/Navbar'
import { Col, Container, Row } from 'react-bootstrap'
import LinkList from '../components/LinksList'
import SideBar from '../components/sidebar'
import Look from '../components/Look/LookHeader'

export default function AdminPage() {
  const [tab, setTab] = useState(1)

  return (
    <section className='flex-grow min-vh-100'>
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
          </Col>
        </Row>
      </Container>
      <SideBar />
    </section>
  )
}
