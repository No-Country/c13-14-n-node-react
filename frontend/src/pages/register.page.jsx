import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerValidationSchema } from '../validations/auth.shcema'
import { useState } from 'react'

import Logo from '../components/logo'
import useLanguage from '../hooks/useLanguage'
import { Link, useNavigate } from 'react-router-dom'
import { APP_URL_LANDING } from '../config/constants'
import toast, { Toaster } from 'react-hot-toast'
import { formatMessageError } from '../libs/errors'
import useSession from '../hooks/useSession'

export default function RegisterPage () {
  const { register: registerHook } = useSession()

  const [step, setStep] = useState(1)
  const { dictionaryWord } = useLanguage('registerPage')
  const { dictionaryWord: dictionaryErrors } = useLanguage('errors')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: 'onBlur'
  })

  const onSubmit = async (data) => {
    const res = await registerHook(data)
    res.solved
      ? handleRedirection()
      : handleError(res.payload)
  }

  const handleRedirection = () => {
    toast.success('Se ha enviado un correo ded validación a ' + getValues('email'), {
      position: 'top-center'
    })
    setTimeout(() => navigate(APP_URL_LANDING), 3000)
  }

  const handleError = (message) => {
    const error = formatMessageError(message)
    toast.error(dictionaryErrors(error))
  }

  return (
    <Container className='min-vh-100'>
      <Toaster
         position="bottom-center"
        reverseOrder={false}
      />
      <Row className='min-vh-100'>
        <Col sm={12} md={6} className='d-flex justify-content-center align-items-center' >
          <Link to={APP_URL_LANDING}>
            <Logo height='37px' width='160px' fill='black' />
          </Link>
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
                    autoFocus
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
                  <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={dictionaryWord('profilePlaceholder')}
                    {...register('profile')}
                    isInvalid={!!errors.profile}
                    isValid = {!errors.profile && dirtyFields.profile}
                    autoFocus
                  />
                </InputGroup>
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
                  {/* <Button
                    type='submit'
                    onClick={() => setValue('profile', null)}
                    className='form-btn'
                    variant="outline-primary"
                  >
                    Omitir y registrarse
                  </Button> */}
                  <Button
                    onClick={() => setStep(1)}
                    className='form-btn'
                    variant="outline-primary"
                  >
                    Volver
                  </Button>
                </div>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
