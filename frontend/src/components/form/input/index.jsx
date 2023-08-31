import { useState } from 'react'
import Form from 'react-bootstrap/Form'

export default function InputForm ({ label, type = 'text', name, onChange, placeholder, required, value, onBlur, isValid, isInvalid }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
   <Form.Group id={name} className='mb-4' key={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        id= {'id_' + name}
        name={name}
        type={ showPassword ? 'text' : type}
        value= {value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur = {onBlur}
        required = {required}
        isValid = {isValid}
        isInvalid = {isInvalid}
      >
        {
        /*   type === 'password' &&
          <i onClick={() => setShowPassword(!showPassword)} className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i> */
        }
        <i className='fas fa-eye-slash'></i>
      </Form.Control>
    </Form.Group>
  )
}
