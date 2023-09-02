import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginValidationSchema } from '../validations/auth.shcema'

import Logo from '../components/logo'
import useLanguage from '../hooks/useLanguage'
import { useNavigate } from 'react-router-dom'
import { APP_URL_ADMIN, APP_URL_LANDING } from '../config/constants'
import useSession from '../hooks/useSession'
import { useState } from 'react'

export default function LoginPage () {
  const { dictionaryWord } = useLanguage('loginPage')
  const [showError, setShowError] = useState(false)
  const { login } = useSession()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    const res = await login(data)
    !res
      ? setShowError(res)
      : navigate(APP_URL_ADMIN)
  }

  return (
    <Container className='min-vh-100'>
      <Row className='min-vh-100'>
        <Col sm={12} md={6} className='d-flex justify-content-center align-items-center' >
          <Logo height='37px' width='160px' fill='black' />
        </Col>
        <Col sm={12} md={6} xl={4} className='d-flex justify-content-center align-items-md-center' >
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className='w-100' >
              <div className='w-100'>
                <h1 className='form-header mb-4' >{dictionaryWord('title')}</h1>

                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={dictionaryWord('emailPlaceholder')}
                    {...register('email')}
                    isInvalid={!!errors.email}
                    isValid = {!errors.email && dirtyFields.email}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label>{dictionaryWord('password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={dictionaryWord('passwordPlaceholder')}
                    {...register('password')}
                    isInvalid={!!errors.password}
                    isValid = {!errors.password && dirtyFields.password}
                  />
                </Form.Group>

                <div className="d-grid my-5 gap-3">
                  <Button
                    type='submit'
                    className='form-btn'
                    variant="primary"
                    disabled={!(dirtyFields.email && dirtyFields.password && !errors.email && !errors.password)}
                  >
                    {dictionaryWord('buttonLogin')}
                  </Button>
                  <Button
                    className='form-btn'
                    variant="outline-primary"
                    onClick={() => navigate(APP_URL_LANDING)}
                  >
                    {dictionaryWord('buttonHome')}
                  </Button>
                </div>
              </div>

          </Form>
        </Col>
      </Row>
      {showError && <p>No se pudo iniciar sesion</p>}
    </Container>
  )
}
