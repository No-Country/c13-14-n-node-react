import Form from 'react-bootstrap/Form'

export default function InputForm ({ controlId, type, label, placeholder, register, isValid, isInvalid }) {
  return (
   <Form.Group className="mb-3" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register(controlId)}
        isInvalid={isInvalid}
        isValid = {isValid}
      />
    </Form.Group>

  )
}
