import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import useLanguage from '../hooks/useLanguage'

import useForm from '../hooks/useForm'
import { formRegisterFields } from '../forms/register.form'

import { APP_URL_LANDING, APP_URL_LOGIN } from '../config/constants'
import Logo from '../components/logo'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function RegisterPage () {
  const { dictionaryWord } = useLanguage('registerPage')
  const [step, setStep] = useState(1)
  const [disabled, setDisabled] = useState(true)

  const { fields, handleChange, handleKeyDown, errors } = useForm(formRegisterFields)

  const navigate = useNavigate()

  const handleClick = () => {

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('estoy aca')
    // const res = await registerService(data)
    //! Temporal para la demo
    // res && navigate(APP_URL_LOGIN)
  }

  return (
    <Container >
      <Row className='min-vh-100 ' >
        <Col md={6} className='d-flex justify-content-center align-items-center'>
          <Link to={APP_URL_LANDING}>
            <Logo fill='black' width='160px' height='37px'/>
          </Link>
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-start align-items-md-center'>
          <Row className='flex-column form-m-width' >
              <Col>
                <h2 className='form-header my-4 '>
                  {dictionaryWord(`title${step}`)}
                </h2>
              </Col>
              <Col >
                <Form onSubmit={handleSubmit}>
                  {fields.map(item =>
                    item.step === step &&
                    <Form.Group id={item.name} className='mb-4' key={item.name}>
                      <Form.Label>{dictionaryWord('' + item.name)}</Form.Label>
                    <Form.Control
                      name={item.name}
                      type={item.type}
                      value= {item.value}
                      className={!!errors[item.name] && 'red-border'}
                      onChange={handleChange}
                      /* onKeyDown={handleKeyDown} */
                      placeholder={dictionaryWord(`${item.name}Placeholder`)}
                      required
                      />
                    </Form.Group>
                  )}

                  <div>
                    <p className='mt-4 form-text-info'>
                      {dictionaryWord('tycOne')}
                      <Link
                        to='#'>{dictionaryWord('tycTwo')}
                      </Link>
                      {dictionaryWord('tycTree')}
                      <Link
                        to='#'>{dictionaryWord('tycFour')}
                      </Link>
                    </p>
                  </div>

                   <Button
                    onClick={handleClick}
                    className='form-btn w-full mt-3'
                    disabled = {disabled}
                  >
                    { dictionaryWord(`buttonStep${step}`)}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa un correo electrónico válido.
                  </Form.Control.Feedback>
                  {/* error && <p className='text-red'>{dictionaryWord(error)}</p> */}
                </Form>
              </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
