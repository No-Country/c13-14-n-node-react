import useLanguage from '../hooks/useLanguage'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import Logo from '../components/logo'
import { APP_URL_LOGIN, APP_URL_REGISTER } from '../config/constants'

export default function LandinPage () {
  const { dictionaryWord } = useLanguage('landingPage')
  const navigate = useNavigate()
  return (
    <Container fluid as='section' className='bg-landing' >
      <Row className='d-flex fluid'>
        <Col sm={12} className='d-flex flex-column justify-content-center align-items-center gap-4'>
          <Logo/>
          <h1>{dictionaryWord('welcome')}</h1>
        </Col>
        <Col sm={12} className='d-flex flex-column gap-3 mt-5 '>
          <Button
            className='btn-landing'
            onClick={() => navigate(APP_URL_REGISTER)}
          >
            {dictionaryWord('register')}
          </Button>
          <Button
            onClick={() => navigate(APP_URL_LOGIN)}
            variant="outline-light" className='btn-landing'
          >
            {dictionaryWord('login')}
          </Button>
        </Col>
      </Row>

    </Container>
  )
}
