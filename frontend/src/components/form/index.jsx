export default function InputForm ()=>{

return (
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

)

}