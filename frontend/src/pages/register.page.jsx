import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import useLanguage from '../hooks/useLanguage'
import { sendRegistrationData } from '../services/auth.service'
import { nameValidations, emailValidation, passwordValidation } from '../validations/register.validator'

import InputForm from '../components/form/input'
import ButtonForm from '../components/form/button'
import { APP_URL_VALIDATE } from '../config/constants'

export default function RegisterPage () {
  const navigate = useNavigate
  const { dictionaryWord } = useLanguage()
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const onSubmit = (data) => {
    sendRegistrationData(data)
      .then(res => {
        // Si la respuesta es valida ir al formulario de validacion
        res && navigate(APP_URL_VALIDATE)
      })
      .catch(error => {
        //! Tratar el error
        console.log(error)
      })
  }

  const validatePasswordConfirmation = (value) => {
    const password = watch('password')
    if (value !== password) {
      return 'nomatch'
    }
    return true
  }

  const messageError = (name) => {
    const filedErrors = errors[name]
    if (!filedErrors) return null
    let error = filedErrors.type
    if (name === 'name' && (error === 'minLength' || error === 'maxLength')) error = 'nameLength'
    if (name === 'password' && (error === 'minLength' || error === 'maxLength')) error = 'passwordLength'
    if (name === 'confirm' && error === 'validate') error = 'noMatch'
    return dictionaryWord('register.' + error)
  }

  return (
    <section className='max-w-sm mx-auto'>
      <h2 className='text-center text-3xl font-bold my-10'>
        {dictionaryWord('register.title')}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
              id='name'
              label={dictionaryWord('register.name')}
              register={register}
              validations={nameValidations}
              messageError={messageError}
          />
          <InputForm
              id='email'
              type='email'
              label={dictionaryWord('register.email')}
              register={register}
              validations={emailValidation}
              messageError={messageError}
          />
          <InputForm
              id='password'
              type='password'
              label={dictionaryWord('register.password')}
              register={register}
              validations={passwordValidation}
              messageError={messageError}
          />
          <InputForm
              id='confirm'
              type='password'
              label={dictionaryWord('register.confirm')}
              register={register}
              validations={{ validate: validatePasswordConfirmation }}
              messageError={messageError}
          />
          <ButtonForm
            label={dictionaryWord('register.button')}
            onClick={handleSubmit}
          />
      </form>

    </section>
  )
}
