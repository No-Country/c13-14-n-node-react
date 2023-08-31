import { Container, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerValidationSchema } from '../validations/auth.shcema'
import { useState } from 'react'

export default function RegisterPage () {
  const [step, setStep] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields }
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: 'onBlur'
  })

  const onSubmit = (data) => console.log(data)

  return (
    <Container>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        { step === 1 && (
          <>
            <h1 >Crea tu cuenta</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email..."
                {...register('email')}
                isInvalid={!!errors.email}
                isValid = {!errors.email && dirtyFields.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese su contraseña..."
                {...register('password')}
                isInvalid={!!errors.password}
                isValid = {!errors.password && dirtyFields.password}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPasswordConfirmation">
              <Form.Label>Confirmar</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme su contrasña..."
                {...register('passwordConfirmation')}
                isInvalid={!!errors.passwordConfirmation}
                isValid = {!errors.passwordConfirmation && dirtyFields.passwordConfirmation}
              />
            </Form.Group>

            <div className="d-grid my-5">
              <Button
                onClick={() => setStep(2)}
                variant="primary"
                size="lg"
                disabled={!(dirtyFields.email && dirtyFields.password && dirtyFields.passwordConfirmation && !errors.email && !errors.password && !errors.passwordConfirmation)}
              >
                Continuar
              </Button>
            </div>
          </>
        )}
      </Form>
    </Container>
  )
}
