import useLanguage from '../hooks/useLanguage'
import { useNavigate } from 'react-router-dom'

// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import Logo from '../components/logo'
import { APP_URL_LOGIN, APP_URL_REGISTER } from '../config/constants'

export default function LandinPage () {
  const { dictionaryWord } = useLanguage('landingPage')
  const navigate = useNavigate()
  return (
     <section className='bg-landing'>
      <div className='d-flex flex-column gap-5'>
        <Logo/>
        <h1>{dictionaryWord('welcome')}</h1>
      </div>
      <div className='d-flex flex-column gap-3 '>
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
      </div>
    </section>
  )
}

/* <Container
        fluid
        className='d-flex align-items-center justify-content-center vh-100 gap-6 bg-landing'
        >
      <Row className='text-white text-center landing-container'>
          <Row className='w-100 landing-header'>
            <Logo/>
            <h1>{dictionaryWord('welcome')}</h1>
          </Row>
          <Row className='d-flew gap-4'>

          </Row>
      </Row>
    </Container>
 */
