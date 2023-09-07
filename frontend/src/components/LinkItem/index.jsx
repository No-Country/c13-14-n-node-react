import { Button, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from 'react-icons/fa'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function LinkItem ({ link, handleDeleteLink, handletoggleLinkStatus }) {
  // const [name, setName] = useState(link.name)
  const [showUpdateLinkModal, setShowUpdateLinkModal] = useState(false)

  // Define la función handleInputChange para actualizar el estado 'name'
  // const handleInputChange = (event) => {
  //   setName(event.target.value)
  // }

  const handleShowUpdateLinkModal = () => {
    setShowUpdateLinkModal(true)
  }
  const handleCloseUpdateLinkModal = () => {
    setShowUpdateLinkModal(false)
  }

  const handleUpdateLinkFormSubmit = () => {

  }

  return (
    <>
      <Card>
        <Card.Body className=' px-3'>
          <div className='d-flex justify-content-between border rounded px-3 py-2 tittleContainer'>
            <Card.Title className='d-flex'>
              {link.name}
              <Button onClick={handleShowUpdateLinkModal} className='mx-3' variant=""><MdOutlineModeEditOutline /></Button>
            </Card.Title>
            <Form.Check
              type="switch"
              id="custom-switch"
              defaultChecked={link.status}
              onChange={() => handletoggleLinkStatus(link)}
            />
          </div>
          <div className='d-flex justify-content-between'>
            <Link>
              <Card.Text className='m-2'>
                {link.urlEnlace}
                <Button onClick={handleShowUpdateLinkModal} className='mx-3' variant=""><MdOutlineModeEditOutline /></Button>
              </Card.Text>
            </Link>
            <Button onClick={() => handleDeleteLink(link)} className='' variant=""><FaTrashAlt /></Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para editar un link */}
      <Modal show={showUpdateLinkModal} onHide={handleCloseUpdateLinkModal}>
        <Modal.Header className='modalHeader' closeButton>
          <Modal.Title className="modalTitle">
            <strong>Editar Link</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <Form className='d-flex flex-wrap justify-content-center' onSubmit={handleUpdateLinkFormSubmit}>
            <Form.Group className="formFields m-2 col-10" controlId="formBasicName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={link.name}
              />
            </Form.Group>
            <Form.Group className="formFields m-2 col-10" controlId="formBasicUrlEnlace">
              <Form.Label>URL:</Form.Label>
              <Form.Control
                type="text"
                name="urlEnlace"
                defaultValue={link.urlEnlace}
              />
            </Form.Group>
            <Modal.Footer className="mt-3 col-8">
              <div className='col-12'>
                <Button className='buttonsFormAddPatient w-100' variant="primary" type="submit">
                  Guardar
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
