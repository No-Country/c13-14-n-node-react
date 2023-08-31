import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerValidationSchema } from '../validations/auth.shcema'
import { useState } from 'react'

import Logo from '../components/logo'
import useLanguage from '../hooks/useLanguage'
import Messagebox from '../components/Messagebox'
import { useNavigate } from 'react-router-dom'
import { APP_URL_LANDING } from '../config/constants'
import { registerService } from '../services/auth.service'

export default function RegisterPage () {
  const [step, setStep] = useState(1)
  const { dictionaryWord } = useLanguage('registerPage')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    const res = await registerService(data)
    console.log(res)
    res && setShow(true)
  }

  return (
    <Container className='min-vh-100'>
      <Row className='min-vh-100'>
        <Col sm={12} md={6} className='d-flex justify-content-center align-items-center' >
          <Logo height='37px' width='160px' fill='black' />
        </Col>
        <Col sm={12} md={6} xl={4} className='d-flex justify-content-center align-items-md-center' >
          <Form noValidate onSubmit={handleSubmit(onSubmit)} className='w-100' >
            { step === 1 && (
              <div className='w-100'>
                <h1 className='form-header mb-4' >{dictionaryWord('title1')}</h1>

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

                <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
                  <Form.Label>{dictionaryWord('confirm')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={dictionaryWord('confirmPlaceholder')}
                    {...register('passwordConfirmation')}
                    isInvalid={!!errors.passwordConfirmation}
                    isValid = {!errors.passwordConfirmation && dirtyFields.passwordConfirmation}
                  />
                </Form.Group>

                <div className="d-grid my-5 gap-3 ">
                  <Button
                    onClick={() => setStep(2)}
                    className='form-btn'
                    variant="primary"
                    disabled={!(dirtyFields.email && dirtyFields.password && dirtyFields.passwordConfirmation && !errors.email && !errors.password && !errors.passwordConfirmation)}
                  >
                    {dictionaryWord('buttonStep1')}
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
            )}
            { step === 2 && (
              <div className='w-100'>
                <h1 className='form-header mb-4' >{dictionaryWord('title2')}</h1>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>{dictionaryWord('profile')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={dictionaryWord('profilePlaceholder')}
                    {...register('profile')}
                    isInvalid={!!errors.profile}
                    isValid = {!errors.profile && dirtyFields.profile}
                  />
                </Form.Group>
                <div className="d-grid my-5 gap-3">
                  <Button
                    type='submit'
                    className='form-btn'
                    variant="primary"
                    disabled = {!(dirtyFields.profile && !errors.profile)}
                  >
                    Crear cuenta y perfil
                  </Button>
                  <Button
                    type='submit'
                    onClick={() => setValue('profile', null)}
                    className='form-btn'
                    variant="outline-primary"
                  >
                    Omitir y registrarse
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </Col>
      </Row>
      <Messagebox
        title='Registro envidao'
        body={`Recibirá un correo a ${getValues('email')} para validar el correo`}
        show={show}
        setShow={setShow}
        onClose={() => navigate(APP_URL_LANDING)}
      />
    </Container>
  )
}
