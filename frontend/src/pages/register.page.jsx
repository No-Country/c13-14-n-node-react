import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { fieldsSteps } from '../config/fields'
import useLanguage from '../hooks/useLanguage'
import { registerService } from '../services/auth.service'

import { APP_URL_LOGIN } from '../config/constants'
import Logo from '../components/logo'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function RegisterPage () {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const { dictionaryWord } = useLanguage()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const handleClick = () => {
    const value = step === 1 ? 2 : 1
    setStep(value)
  }

  const onSubmit = async (data) => {
    const res = await registerService(data)
    //! Temporal para la demo
    res && navigate(APP_URL_LOGIN)
  }

  return (
    <section className='d-flex flex-column justify-content-center align-items-center w-350 m-auto '>
      <div className='register-hader mt-3'>
        <Logo fill='black' width='160px' height='37px'/>
        <h2 className='text-center text-3xl font-bold my-10'>
          {dictionaryWord('registerPage.title' + step)}
        </h2>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fieldsSteps.map(item =>
          item.step === step &&
          <Form.Group id={item.name} className='mb-4' key={item.name}>
            <Form.Label>{dictionaryWord('registerPage.' + item.name)}</Form.Label>
          <Form.Control
            type={item.type}
            placeholder={dictionaryWord(`registerPage.${item.name}Placeholder`)}
            {...register(item.name)}
            />
          </Form.Group>
        )}

        <div>
          <p className='mt-4 fs-14'>
            {dictionaryWord('registerPage.tycOne')}
            <Link
              to='#'>{dictionaryWord('registerPage.tycTwo')}
            </Link>
            {dictionaryWord('registerPage.tycTree')}
            <Link
              to='#'>{dictionaryWord('registerPage.tycFour')}
            </Link>
          </p>
        </div>
        { step === 2 && (
          <Button
            type='submit'
            className='w-full mt-2'
          >
            Registrarme
          </Button>
        )}
        <Button
          variant={ step === 2 ? 'outline-primary' : 'primary'}
          onClick={handleClick}
          className='w-full mt-3'
        >
          {step === 1 ? 'Continuar' : 'volver'}
        </Button>

      </Form>
    </section>
  )
}
