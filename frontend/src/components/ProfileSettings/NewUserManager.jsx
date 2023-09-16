import { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import { ButtonPrimary } from '../theme/buttons'
import useProfile from '../../hooks/useProfile'

export default function NewUserManager ({ show, onHide }) {
  const { addUserManager } = useProfile()
  const [email, setEmail] = useState('')

  const handleChange = (e) => setEmail(e.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await addUserManager(email)

    console.log(res)
    setEmail('')
    if (res.solved) {
      console.log(email)

      handleSolved()
    } else {
      toast.error(res.payload.message)
    }
  }

  const handleSolved = () => {
    toast.success('Delegación creada con éxito...', { position: 'top-center' })
    setTimeout(onHide, 1000)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Modal.Header className="modalHeader" closeButton>
        <Modal.Title className="modalTitle">
          <strong>Nueva Delegación</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-wrap justify-content-center" onSubmit={handleSubmit}>
          <Form.Group className="col-10 mt-2" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              autoFocus
              isValid={!!email}
              isInvalid={!email}
              onChange={handleChange}
              value={email}
            />
          </Form.Group>
          <Modal.Footer className="mt-4 col-10">
            <div className="col-12">
              <ButtonPrimary
                type="submit"
                disabled={!email}
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
