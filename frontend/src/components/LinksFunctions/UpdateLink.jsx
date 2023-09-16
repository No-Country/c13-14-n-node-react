import { Button, Form, Modal } from 'react-bootstrap'
import useLinks from '../../hooks/useLinks'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function UpdateLink ({ show, onHide, link }) {
  const [formData, setFormData] = useState(link)
  const { updateLink } = useLinks()

  /*   useEffect(() => {
    if (data) {
      setFormData(data)
      setInitialData(data)
    }
  }, [data]) */

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Solo actualiza el enlace si hay cambios
    const { name, urlEnlace } = formData
    if (name !== link.name || urlEnlace !== link.urlEnlace) {
      const res = await updateLink(formData)
      if (res.solved) {
        handleSolved()
      } else {
        toast.error(res.payload.message)
      }
    } else {
      // Si no hay cambios, simplemente cierra el modal
      onHide()
    }
  }

  const handleSolved = () => {
    toast.success('Link actualizado con éxito...', { position: 'top-center' })
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
          <strong>Modificar Link</strong>
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
              maxLength="25"
              value={formData.name} // Use formData.name, not defaultValue
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
              value={formData.urlEnlace} // Use formData.urlEnlace, not defaultValue
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
