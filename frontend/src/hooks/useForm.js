import { useState } from 'react'

export default function useForm (inicialFields) {
  const [fields, setFields] = useState(inicialFields)
  const [errors, setErrors] = useState({})

  const changeField = (name, value) => {
    const field = fields.find(item => item.name === name)
    field.value = value
    console.log([...fields, field])
    setFields([...fields, field])
  }

  const handleChange = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') return
    const { name, value } = event.target
    changeField(name, value)
    if (errors[name]) { setErrors({ ...errors, [name]: null }) }
  }

  const resetForm = () => {
    setFields(inicialFields)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      const { name, value } = event.target
      const field = fields.find(item => item.name === name)
      const resul = field.validate(value)
      field.isValid = resul === null
      setErrors({ ...errors, [name]: resul })
    }
  }

  return {
    fields,
    handleChange,
    handleKeyDown,
    resetForm,
    errors
  }
}
