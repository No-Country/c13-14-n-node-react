import { Button, Form, Modal } from 'react-bootstrap'
import useLinks from '../../hooks/useLinks'
import { useState } from 'react'
import { LINK_INICIAL_STATE } from '../../config/constants'
import toast, { Toaster } from 'react-hot-toast'

export default function NewLink ({ show, onHide, data }) {
  const [formData, setFormData] = useState(data || LINK_INICIAL_STATE)
  const { addLink, nextOrder } = useLinks()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { name, urlEnlace } = formData
    const res = await addLink({
      name,
      icon: '123',
      urlEnlace,
      order: nextOrder(),
      status: true
    })
    res.solved
      ? handleSolved()
      : toast.error(res.payload.message)
  }

  const handleSolved = () => {
    toast.success('Link creado con éxito...', { position: 'top-center' })
    setTimeout(onHide, 1000)
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <Modal.Header className='modalHeader' closeButton>
        <Modal.Title className="modalTitle">
          <strong>Nuevo Link</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='modalBody'>
        <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleSubmit}>
          <Form.Group className="formFields m-2 col-10" controlId="formBasicName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoFocus
              isValid={!!formData.name}
              isInvalid={!formData.name}
              onChange={handleChange}
              value={formData.name}
            />
          </Form.Group>
          <Form.Group className="formFields m-2 col-10" controlId="formBasicUrlEnlace">
            <Form.Label>URL:</Form.Label>
            <Form.Control
              type="text"
              name="urlEnlace"
              isValid={!!formData.urlEnlace}
              isInvalid={!formData.urlEnlace}
              onChange={handleChange}
              value={formData.urlEnlace}
            />
          </Form.Group>
          <Modal.Footer className="mt-3 col-8">
            <div className='col-12'>
              <Button
                className='buttonsFormAddPatient w-100'
                variant="primary"
                type="submit"
                disabled={!formData.name || !formData.urlEnlace}
              >
                Guardar
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
