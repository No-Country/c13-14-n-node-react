import { Form, InputGroup, Modal } from 'react-bootstrap'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ButtonPrimary } from '../theme/buttons'

export default function NewProfile ({ show, onHide, addProfile }) {
  const [nameSpace, setNameSpace] = useState('')
  const [blur, setBlur] = useState(false)

  const handleChange = (e) => setNameSpace(e.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setBlur(true)
    const res = await addProfile(nameSpace)
    console.log(res)
    setNameSpace('')
    res.solved
      ? handleSolved()
      : toast.error(res.payload.message)
  }

  const handleSolved = () => {
    toast.success('Link creado con éxito...', { position: 'top-center' })
    setTimeout(onHide, 1000)
    onHide()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Modal.Header className='modalHeader' closeButton>
        <Modal.Title className="modalTitle">
          <strong>Nuevo Perfil</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleSubmit}>
          <Form.Group className="col-10 mt-2" controlId="formBasicName">
            <Form.Label>Nombre:</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                type="text"
                name="nameSpace"
                autoFocus
                isValid={!!nameSpace}
                isInvalid={!nameSpace && blur}
                onChange={handleChange}
                value={nameSpace}
              />
            </InputGroup>
          </Form.Group>
          <Modal.Footer className="mt-4 col-10">
            <div className='col-12'>
              <ButtonPrimary
                type="submit"
                disabled={!nameSpace}
              >
                Guardar
              </ButtonPrimary>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
